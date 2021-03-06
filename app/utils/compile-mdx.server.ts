import * as mdxBundler from "mdx-bundler";
import { remarkMdxImages } from "remark-mdx-images";

import { join, resolve } from "path";
import { readFile } from "fs/promises";

type IBundleMdx = {
  cwd: string;
  source: string;
};

// `resolve` won't work in a non `.server.ts` file
export const getContentPath = () => resolve('content');

export const getFilePath = (contentPath: string, filename: string) =>
  resolve(contentPath, filename);

export const bundleMDX = async ({ cwd, source }: IBundleMdx) => {
  const { default: remarkGfm } = await import("remark-gfm");
  const { default: remarkBreaks } = await import("remark-breaks");
  const { default: rehypeSlug } = await import("rehype-slug");
  const { default: rehypePrism } = await import("rehype-prism-plus");

  return mdxBundler.bundleMDX({
    cwd,
    source,
    xdmOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkMdxImages,
        remarkGfm,
        remarkBreaks
      ];

      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        [rehypePrism, { ignoreMissing: true, showLineNumbers: false }],
      ];

      return options;
    },
    esbuildOptions: (options) => {
      // Set the `outdir` to a public location for this bundle.
      // console.log("esbuildOptions", resolve("public"));
      // options.outdir = resolve("public", "build", "_assets");
      options.outdir = resolve("public/build/_assets");
      options.loader = {
        ...options.loader,
        ".png": "file",
        ".jpg": "file",
        ".jpeg": "file",
      };

      options.publicPath = join("/build/_assets");

      // Set write to true so that esbuild will output the files.
      options.write = true;

      return options;
    },
  });
};
