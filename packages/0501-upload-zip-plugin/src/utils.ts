const qiNiu = require('qiniu');

type UpZipOptions = {
  localFile: string;
  key: string;
};

/**
 * 上传zip到七牛
 * @returns
 */
export function uploadZip(props: UpZipOptions): Promise<any> {
  try {
    return new Promise((resolve, reject) => {
      const accessKey = 'VXx5qAms81PB5Iv1lociP3m5SxNzlEkw5mKz_4s-';
      const secretKey = 'kfkG4PGLPHrWTh8ZbcZsHauMYVmYmZ9Iaru8IEBS';
      const bucket = '3mu-space';

      // 本地文件路径
      // const localFile = '/path/to/your/file.txt';
      // 上传的文件名，可以自定义
      // const key = 'your/custom/key';
      const { localFile, key } = props;

      // 初始化配置
      const mac = new qiNiu.auth.digest.Mac(accessKey, secretKey);

      const putPolicy = new qiNiu.rs.PutPolicy({
        scope: `${bucket}:${key}`,
      });
      const uploadToken = putPolicy.uploadToken(mac);

      // 上传文件
      const formUploader = new qiNiu.form_up.FormUploader();
      formUploader.putFile(
        uploadToken,
        key,
        localFile,
        null,
        function (err: any, res: any) {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        }
      );
    });
  } catch (err) {
    return Promise.reject(err);
  }
}
