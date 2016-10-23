/**
 * Created by Administrator on 2016/6/24.
 */
var SVG_NS = "http://www.w3.org/2000/svg"


//中国各省份星巴克分店数，数据来自：高德地图
var PROVINCES = {
    anhui:{chinese:"安徽",data:20},
    aomen:{chinese:"澳门",data:6},
    beijing:{chinese:"北京",data:211},
    chongqing:{chinese:"重庆",data:38},
    fujian:{chinese:"福建",data:70},
    gansu:{chinese:"甘肃",data:6},
    guangdong:{chinese:"广东",data:284},
    guangxi:{chinese:"广西",data:11},
    guizhou:{chinese:"贵州",data:11},
    hainan:{chinese:"海南",data:12},
    hebei:{chinese:"河北",data:23},
    heilongjiang:{chinese:"黑龙江",data:25},
    henan:{chinese:"河南",data:27},
    hubei:{chinese:"湖北",data:137},
    hunan:{chinese:"湖南",data:39},
    liaoning:{chinese:"辽宁",data:48},
    jiangsu:{chinese:"江苏",data:315},
    jiangxi:{chinese:"江西",data:20},
    jilin:{chinese:"吉林",data:15},
    neimenggu:{chinese:"内蒙古",data:10},
    ningxia:{chinese:"宁夏",data:3},
    qinghai:{chinese:"青海",data:3},
    shandong:{chinese:"山东",data:74},
    shanghai:{chinese:"上海",data:469},
    shanxi:{chinese:"山西",data:8},
    shanxiHZ:{chinese:"陕西",data:41},
    sichuan:{chinese:"四川",data:85},
    taiwan:{chinese:"台湾",data:488},
    tianjin:{chinese:"天津",data:49},
    xianggang:{chinese:"香港",data:120},
    xinjiang:{chinese:"新疆",data:2},
    xizang:{chinese:"西藏",data:1},
    yunnan:{chinese:"云南",data:29},
    zhejiang:{chinese:"浙江",data:280}
}

// 人口数据
// var PROVINCES = {
//     anhui:{chinese:"安徽",data:5017},
//     aomen:{chinese:"澳门",data:0},
//     beijing:{chinese:"北京",data:18499},
//     chongqing:{chinese:"重庆",data:5094},
//     fujian:{chinese:"福建",data:8843},
//     gansu:{chinese:"甘肃",data:4234},
//     guangdong:{chinese:"广东",data:8526},
//     guangxi:{chinese:"广西",data:4442},
//     guizhou:{chinese:"贵州",data:3694},
//     hainan:{chinese:"海南",data:9262},
//     hebei:{chinese:"河北",data:4988},
//     heilongjiang:{chinese:"黑龙江",data:4517},
//     henan:{chinese:"河南",data:3909},
//     hubei:{chinese:"湖北",data:5085},
//     hunan:{chinese:"湖南",data:3830},
//     liaoning:{chinese:"辽宁",data:5107},
//     jiangsu:{chinese:"江苏",data:6783},
//     jiangxi:{chinese:"江西",data:4971},
//     jilin:{chinese:"吉林",data:4810},
//     neimenggu:{chinese:"内蒙古",data:3833},
//     ningxia:{chinese:"宁夏",data:3747},
//     qinghai:{chinese:"青海",data:4294},
//     shandong:{chinese:"山东",data:5029},
//     shanghai:{chinese:"上海",data:16415},
//     shanxi:{chinese:"山西",data:4462},
//     shanxiHZ:{chinese:"陕西",data:4823},
//     sichuan:{chinese:"四川",data:5092},
//     taiwan:{chinese:"台湾",data:0},
//     tianjin:{chinese:"天津",data:8828},
//     xianggang:{chinese:"香港",data:0},
//     xinjiang:{chinese:"新疆",data:4057},
//     xizang:{chinese:"西藏",data:5323},
//     yunnan:{chinese:"云南",data:4451},
//     zhejiang:{chinese:"浙江",data:10586}
// }
//
