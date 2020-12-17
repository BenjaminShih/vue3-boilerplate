const ip = require('ip');
const path = require('path');
const localIp = ip.address();
const port = '8099';
const buildPath = path.resolve(__dirname, 'dist');
const appPath = path.resolve(__dirname, 'src');
const domain = 'http://' + localIp + ':' + port + '/';

function confirmSuffix(prefix) {
  if (prefix) {
    if (!/\/$/.test(prefix)) {
      prefix = prefix + '/'
    }
  } else {
    prefix = '/'
  }
  return prefix
}

/**
 * 当在线发布时，一般会把静态资源发布到cdn
 * 可以通过设置 `ASSETS_PATH` 环境变量， 设置cdn地址，如：
 * export ASSETS_PATH=http://www.cdn.com/
 */
const onlinePublishPathPrefix = confirmSuffix(process.env.ASSETS_PATH)

/**
 * 当在线发布时，如果在同一域名下，Nginx上转发接口需要识别前缀
 * 可以通过设置 `API_PREFIX` 环境变量，设置cdn地址，如：
 * export API_PREFIX=backend-server-api
 */
const onlinePublishApiPrefix = process.env.API_PREFIX

const globalConfig = {
  ip: localIp,
  port,
  domain,
  buildPath,
  staticPublicPath: 'static/',
  onlinePublishPathPrefix,
  onlinePublishApiPrefix,
  appPath,
}

module.exports = globalConfig;