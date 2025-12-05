// 国内DNS服务器
const domesticNameservers = [
  "https://dns.alidns.com/dns-query", // 阿里云公共DNS
  "https://doh.pub/dns-query", // 腾讯DNSPod
  "https://doh.apad.pro/dns-query"
];
// 国外DNS服务器
const foreignNameservers = [
  "https://1.1.1.1/dns-query", // Cloudflare
  "https://101.102.103.104/dns-query", // 台湾Quad 101
  "https://208.67.220.220/dns-query", // OpenDNS
  "https://194.242.2.2/dns-query", // Mullvad(主)
  "https://194.242.2.3/dns-query" // Mullvad(备)
];
// DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com"
  ],
  "default-nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"],
  "nameserver": [...domesticNameservers, ...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
  "nameserver-policy": {
    "geosite:private,cn,apple,geolocation-cn": domesticNameservers,
    "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
  }
};
// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};
// 规则集配置
const ruleProviders = {
  "reject": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    "path": "./ruleset/loyalsoldier/reject.yaml"
  }, // 广告域名列表
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./ruleset/loyalsoldier/icloud.yaml"
  }, // iCloud 域名列表
  "apple": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./ruleset/loyalsoldier/apple.yaml"
  }, // Apple 在中国大陆可直连的域名列表
  "google": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
    "path": "./ruleset/loyalsoldier/google.yaml"
  }, // Google 在中国大陆可直连的域名列表
  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/loyalsoldier/proxy.yaml"
  }, // 代理域名列表
  "direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    "path": "./ruleset/loyalsoldier/direct.yaml"
  }, // 直连域名列表
  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/loyalsoldier/private.yaml"
  }, // 私有网络专用域名列表
  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/loyalsoldier/gfw.yaml"
  }, // GFWList 域名列表
  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
  }, // 非中国大陆使用的顶级域名列表
  "telegramcidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
  }, // Telegram 使用的 IP 地址列表
  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/loyalsoldier/cncidr.yaml"
  }, // 中国大陆 IP 地址列表
  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/loyalsoldier/lancidr.yaml"
  }, // 局域网 IP 及保留 IP 地址列表
  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./ruleset/loyalsoldier/applications.yaml"
  }, // 需要直连的常见软件列表
  "YT": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://github.com/blackmatrix7/ios_rule_script/raw/master/rule/Clash/YouTube/YouTube.yaml",
    "path": "./ruleset/youtube.yaml"
  }, // YouTube 使用的 IP 地址列表
  "OpenAI": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OpenAI/OpenAI.yaml",
    "path": "./ruleset/OpenAI.yaml"
  }, // OpenAI 使用的 IP 地址列表
  "Gemini": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Gemini/Gemini.yaml",
    "path": "./ruleset/Gemini.yaml"
  }, // Gemini 使用的 IP 地址列表
  "Copilot": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Copilot/Copilot.yaml",
    "path": "./ruleset/Copilot.yaml"
  }, // Copilot 使用的 IP 地址列表
  "Claude": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Claude/Claude.yaml",
    "path": "./ruleset/Claude.yaml"
  }, // Claude 使用的 IP 地址列表
  "selfdomain": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/kzlong/blogimage/main/Mydirect.txt",
    "path": "./ruleset/Mydirect.yaml",
    "interval": 86400
  }, // 自定义网站
};
// 规则
const rules = [
  // 自定义规则
  "DOMAIN-SUFFIX,cn.bing.com,DIRECT",
  "DOMAIN-SUFFIX,www.pttime.org,Proxy",
  "DOMAIN-SUFFIX,suzhi.fun,DIRECT",
  "DOMAIN-SUFFIX,i.imgur.com,AI",
  "DOMAIN-SUFFIX,www.ghxi.com,Proxy",
  "DOMAIN-SUFFIX,1password.com,DIRECT",
  "DOMAIN-SUFFIX,adobe.io,REJECT",
  "DOMAIN-SUFFIX,lcs-cops.adobe.io,DIRECT",
  "DOMAIN-SUFFIX,googleapis.cn,Proxy", // Google服务
  "DOMAIN-SUFFIX,gstatic.com,Proxy", // Google静态资源
  "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,Proxy", // Google Play下载服务
  "DOMAIN-SUFFIX,github.io,Proxy", // Github Pages
  "DOMAIN-SUFFIX,v2rayse.com,Proxy", // V2rayse节点工具
  // Loyalsoldier 规则集
  "RULE-SET,apple,DIRECT",
  "RULE-SET,YT,YouTube",  // 油管规则集
  "RULE-SET,OpenAI,AI",  // OpenAI 规则集
  "RULE-SET,Gemini,AI",  // Gemini 规则集
  "RULE-SET,Claude,AI",  // Claude 规则集
  "RULE-SET,Copilot,AI",  // Copilot 规则集     
  "RULE-SET,applications,DIRECT",
  "RULE-SET,selfdomain,DIRECT",
  "RULE-SET,private,DIRECT",
  "RULE-SET,reject,AD Block",
  "RULE-SET,icloud,DIRECT",
  "RULE-SET,google,Proxy",
  "RULE-SET,proxy,Proxy",
  "RULE-SET,gfw,Proxy",
  "RULE-SET,tld-not-cn,Proxy",
  "RULE-SET,direct,DIRECT",
  "RULE-SET,lancidr,DIRECT,no-resolve",
  "RULE-SET,cncidr,DIRECT,no-resolve",
  "RULE-SET,telegramcidr,Telegram,no-resolve",
  // 其他规则
  "GEOIP,LAN,DIRECT",
  "GEOIP,CN,DIRECT",
  "MATCH,Final"
];
// 代理组通用配置
const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;

  // 覆盖原配置中的代理组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "Proxy",
      "type": "select",
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/kzlong/blogimage/main/QuantumultX/Proxy.png"
    },
    {
      ...groupBaseOption,
      "name": "YouTube",
      "type": "select",
      "proxies": ["Proxy"],
	    "exclude-filter": "剩余|套餐",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
    },
    {
      ...groupBaseOption,
      "name": "Telegram",
      "type": "select",
      "proxies": ["Proxy"],
	    "exclude-filter": "剩余|套餐",
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/kzlong/blogimage/main/QuantumultX/Telegram.png"
    },
    {
      ...groupBaseOption,
      "name": "AI",
      "type": "select",
      "proxies": ["Proxy"],
	    "exclude-filter": "剩余|套餐",
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/kzlong/blogimage/main/QuantumultX/AI.png"
    },  
    {
      ...groupBaseOption,
      "name": "AD Block",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/kzlong/blogimage/main/QuantumultX/Ad.png"
    },
    {
      ...groupBaseOption,
      "name": "Direct",
      "type": "select",
      "proxies": ["DIRECT", "Proxy"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "Final",
      "type": "select",
      "proxies": ["Proxy", "Direct"],
      "icon": "https://raw.githubusercontent.com/kzlong/blogimage/main/QuantumultX/Others.png"
    }
  ];

  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  // 返回修改后的配置
  return config;
}