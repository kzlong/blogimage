// ============================
//  自建节点列表（你可以继续添加）
// ============================
const myProxies = [
  {
    name: "🇺🇸 DMIT",
    type: "vless",
    server: "12345678.xyz",
    port: 4443,
    uuid: "47de5ae1-c3cb-4e0e-e22c-12345678",
    tls: true,
    flow: "xtls-rprx-vision",
    network: "tcp",
    "client-fingerprint": "chrome",
    "skip-cert-verify": false,
    servername: "caseend.com",
    "reality-opts": {
      "public-key": "3FksSAuee7xUn415VoyJmh0qFkyZEzZ6Pwhu2541",
      "short-id": "589358d1"
    },
    "grpc-opts": {},
    "ws-opts": {},
    "http-opts": {}
  }
];

// ============================
//  需要自动加入的分组名称
// ============================
const targetGroups = ["蓝胖云LanPangYun"];


// ============================
//       主执行逻辑
// ============================
function main(config) {
  // 1) 向订阅添加自建节点
  config.proxies.push(...myProxies);

  // 2) 将自建节点自动加入指定分组
  config["proxy-groups"].forEach(group => {
    if (targetGroups.includes(group.name)) {
      group.proxies = group.proxies.concat(myProxies.map(p => p.name));
    }
  });

  return config;
}
