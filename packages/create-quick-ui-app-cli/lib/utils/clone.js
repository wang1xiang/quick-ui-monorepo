import { promisify } from "util";
import download from "download-git-repo";
import ora from "ora";
export default async (repo, desc) => {
  const process = ora(`下载.....${repo}`);
  process.start();
  // repo仓库地址 desc拷贝的文件夹 若当前目录没有 则创建 { clone: true } 使用git clone下载 m默认为false 直接下载zip包
  await promisify(download)(repo, desc);
  process.succeed();
};
