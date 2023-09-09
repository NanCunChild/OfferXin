import Toast from '@vant/weapp/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchKey: "",
        isReachMax: false,
        isLoadingData: false,
        recruitment_items: [],
        enterprise_fliter: [],
        isShowCitySelect1: false,
        isShowCitySelect2: false,
        lazyindex: 0,
        showOutRecruitmentItems: [],
        areaList: {
            province_list: {
                110000: '北京市',
                120000: '天津市',
                130000: '河北省',
                140000: '山西省',
                150000: '内蒙古自治区',
                210000: '辽宁省',
                220000: '吉林省',
                230000: '黑龙江省',
                310000: '上海市',
                320000: '江苏省',
                330000: '浙江省',
                340000: '安徽省',
                350000: '福建省',
                360000: '江西省',
                370000: '山东省',
                410000: '河南省',
                420000: '湖北省',
                430000: '湖南省',
                440000: '广东省',
                450000: '广西壮族自治区',
                460000: '海南省',
                500000: '重庆市',
                510000: '四川省',
                520000: '贵州省',
                530000: '云南省',
                540000: '西藏自治区',
                610000: '陕西省',
                620000: '甘肃省',
                630000: '青海省',
                640000: '宁夏回族自治区',
                650000: '新疆维吾尔自治区',
                710000: '台湾省',
                810000: '香港特别行政区',
                820000: '澳门特别行政区',
            },
            city_list: {
                110100: '北京市',
                120100: '天津市',
                130100: '石家庄市',
                130200: '唐山市',
                130300: '秦皇岛市',
                130400: '邯郸市',
                130500: '邢台市',
                130600: '保定市',
                130700: '张家口市',
                130800: '承德市',
                130900: '沧州市',
                131000: '廊坊市',
                131100: '衡水市',
                140100: '太原市',
                140200: '大同市',
                140300: '阳泉市',
                140400: '长治市',
                140500: '晋城市',
                140600: '朔州市',
                140700: '晋中市',
                140800: '运城市',
                140900: '忻州市',
                141000: '临汾市',
                141100: '吕梁市',
                150100: '呼和浩特市',
                150200: '包头市',
                150300: '乌海市',
                150400: '赤峰市',
                150500: '通辽市',
                150600: '鄂尔多斯市',
                150700: '呼伦贝尔市',
                150800: '巴彦淖尔市',
                150900: '乌兰察布市',
                152200: '兴安盟',
                152500: '锡林郭勒盟',
                152900: '阿拉善盟',
                210100: '沈阳市',
                210200: '大连市',
                210300: '鞍山市',
                210400: '抚顺市',
                210500: '本溪市',
                210600: '丹东市',
                210700: '锦州市',
                210800: '营口市',
                210900: '阜新市',
                211000: '辽阳市',
                211100: '盘锦市',
                211200: '铁岭市',
                211300: '朝阳市',
                211400: '葫芦岛市',
                220100: '长春市',
                220200: '吉林市',
                220300: '四平市',
                220400: '辽源市',
                220500: '通化市',
                220600: '白山市',
                220700: '松原市',
                220800: '白城市',
                222400: '延边朝鲜族自治州',
                230100: '哈尔滨市',
                230200: '齐齐哈尔市',
                230300: '鸡西市',
                230400: '鹤岗市',
                230500: '双鸭山市',
                230600: '大庆市',
                230700: '伊春市',
                230800: '佳木斯市',
                230900: '七台河市',
                231000: '牡丹江市',
                231100: '黑河市',
                231200: '绥化市',
                232700: '大兴安岭地区',
                310100: '上海市',
                320100: '南京市',
                320200: '无锡市',
                320300: '徐州市',
                320400: '常州市',
                320500: '苏州市',
                320600: '南通市',
                320700: '连云港市',
                320800: '淮安市',
                320900: '盐城市',
                321000: '扬州市',
                321100: '镇江市',
                321200: '泰州市',
                321300: '宿迁市',
                330100: '杭州市',
                330200: '宁波市',
                330300: '温州市',
                330400: '嘉兴市',
                330500: '湖州市',
                330600: '绍兴市',
                330700: '金华市',
                330800: '衢州市',
                330900: '舟山市',
                331000: '台州市',
                331100: '丽水市',
                340100: '合肥市',
                340200: '芜湖市',
                340300: '蚌埠市',
                340400: '淮南市',
                340500: '马鞍山市',
                340600: '淮北市',
                340700: '铜陵市',
                340800: '安庆市',
                341000: '黄山市',
                341100: '滁州市',
                341200: '阜阳市',
                341300: '宿州市',
                341500: '六安市',
                341600: '亳州市',
                341700: '池州市',
                341800: '宣城市',
                350100: '福州市',
                350200: '厦门市',
                350300: '莆田市',
                350400: '三明市',
                350500: '泉州市',
                350600: '漳州市',
                350700: '南平市',
                350800: '龙岩市',
                350900: '宁德市',
                360100: '南昌市',
                360200: '景德镇市',
                360300: '萍乡市',
                360400: '九江市',
                360500: '新余市',
                360600: '鹰潭市',
                360700: '赣州市',
                360800: '吉安市',
                360900: '宜春市',
                361000: '抚州市',
                361100: '上饶市',
                370100: '济南市',
                370200: '青岛市',
                370300: '淄博市',
                370400: '枣庄市',
                370500: '东营市',
                370600: '烟台市',
                370700: '潍坊市',
                370800: '济宁市',
                370900: '泰安市',
                371000: '威海市',
                371100: '日照市',
                371300: '临沂市',
                371400: '德州市',
                371500: '聊城市',
                371600: '滨州市',
                371700: '菏泽市',
                410100: '郑州市',
                410200: '开封市',
                410300: '洛阳市',
                410400: '平顶山市',
                410500: '安阳市',
                410600: '鹤壁市',
                410700: '新乡市',
                410800: '焦作市',
                410900: '濮阳市',
                411000: '许昌市',
                411100: '漯河市',
                411200: '三门峡市',
                411300: '南阳市',
                411400: '商丘市',
                411500: '信阳市',
                411600: '周口市',
                411700: '驻马店市',
                419000: '省直辖县',
                420100: '武汉市',
                420200: '黄石市',
                420300: '十堰市',
                420500: '宜昌市',
                420600: '襄阳市',
                420700: '鄂州市',
                420800: '荆门市',
                420900: '孝感市',
                421000: '荆州市',
                421100: '黄冈市',
                421200: '咸宁市',
                421300: '随州市',
                422800: '恩施土家族苗族自治州',
                429000: '省直辖县',
                430100: '长沙市',
                430200: '株洲市',
                430300: '湘潭市',
                430400: '衡阳市',
                430500: '邵阳市',
                430600: '岳阳市',
                430700: '常德市',
                430800: '张家界市',
                430900: '益阳市',
                431000: '郴州市',
                431100: '永州市',
                431200: '怀化市',
                431300: '娄底市',
                433100: '湘西土家族苗族自治州',
                440100: '广州市',
                440200: '韶关市',
                440300: '深圳市',
                440400: '珠海市',
                440500: '汕头市',
                440600: '佛山市',
                440700: '江门市',
                440800: '湛江市',
                440900: '茂名市',
                441200: '肇庆市',
                441300: '惠州市',
                441400: '梅州市',
                441500: '汕尾市',
                441600: '河源市',
                441700: '阳江市',
                441800: '清远市',
                441900: '东莞市',
                442000: '中山市',
                445100: '潮州市',
                445200: '揭阳市',
                445300: '云浮市',
                450100: '南宁市',
                450200: '柳州市',
                450300: '桂林市',
                450400: '梧州市',
                450500: '北海市',
                450600: '防城港市',
                450700: '钦州市',
                450800: '贵港市',
                450900: '玉林市',
                451000: '百色市',
                451100: '贺州市',
                451200: '河池市',
                451300: '来宾市',
                451400: '崇左市',
                460100: '海口市',
                460200: '三亚市',
                460300: '三沙市',
                460400: '儋州市',
                469000: '省直辖县',
                500100: '重庆市',
                500200: '县',
                510100: '成都市',
                510300: '自贡市',
                510400: '攀枝花市',
                510500: '泸州市',
                510600: '德阳市',
                510700: '绵阳市',
                510800: '广元市',
                510900: '遂宁市',
                511000: '内江市',
                511100: '乐山市',
                511300: '南充市',
                511400: '眉山市',
                511500: '宜宾市',
                511600: '广安市',
                511700: '达州市',
                511800: '雅安市',
                511900: '巴中市',
                512000: '资阳市',
                513200: '阿坝藏族羌族自治州',
                513300: '甘孜藏族自治州',
                513400: '凉山彝族自治州',
                520100: '贵阳市',
                520200: '六盘水市',
                520300: '遵义市',
                520400: '安顺市',
                520500: '毕节市',
                520600: '铜仁市',
                522300: '黔西南布依族苗族自治州',
                522600: '黔东南苗族侗族自治州',
                522700: '黔南布依族苗族自治州',
                530100: '昆明市',
                530300: '曲靖市',
                530400: '玉溪市',
                530500: '保山市',
                530600: '昭通市',
                530700: '丽江市',
                530800: '普洱市',
                530900: '临沧市',
                532300: '楚雄彝族自治州',
                532500: '红河哈尼族彝族自治州',
                532600: '文山壮族苗族自治州',
                532800: '西双版纳傣族自治州',
                532900: '大理白族自治州',
                533100: '德宏傣族景颇族自治州',
                533300: '怒江傈僳族自治州',
                533400: '迪庆藏族自治州',
                540100: '拉萨市',
                540200: '日喀则市',
                540300: '昌都市',
                540400: '林芝市',
                540500: '山南市',
                540600: '那曲市',
                542500: '阿里地区',
                610100: '西安市',
                610200: '铜川市',
                610300: '宝鸡市',
                610400: '咸阳市',
                610500: '渭南市',
                610600: '延安市',
                610700: '汉中市',
                610800: '榆林市',
                610900: '安康市',
                611000: '商洛市',
                620100: '兰州市',
                620200: '嘉峪关市',
                620300: '金昌市',
                620400: '白银市',
                620500: '天水市',
                620600: '武威市',
                620700: '张掖市',
                620800: '平凉市',
                620900: '酒泉市',
                621000: '庆阳市',
                621100: '定西市',
                621200: '陇南市',
                622900: '临夏回族自治州',
                623000: '甘南藏族自治州',
                630100: '西宁市',
                630200: '海东市',
                632200: '海北藏族自治州',
                632300: '黄南藏族自治州',
                632500: '海南藏族自治州',
                632600: '果洛藏族自治州',
                632700: '玉树藏族自治州',
                632800: '海西蒙古族藏族自治州',
                640100: '银川市',
                640200: '石嘴山市',
                640300: '吴忠市',
                640400: '固原市',
                640500: '中卫市',
                650100: '乌鲁木齐市',
                650200: '克拉玛依市',
                650400: '吐鲁番市',
                650500: '哈密市',
                652300: '昌吉回族自治州',
                652700: '博尔塔拉蒙古自治州',
                652800: '巴音郭楞蒙古自治州',
                652900: '阿克苏地区',
                653000: '克孜勒苏柯尔克孜自治州',
                653100: '喀什地区',
                653200: '和田地区',
                654000: '伊犁哈萨克自治州',
                654200: '塔城地区',
                654300: '阿勒泰地区',
                659000: '自治区直辖县级行政区划',
                710100: '台北市',
                710200: '高雄市',
                710300: '台南市',
                710400: '台中市',
                710500: '金门县',
                710600: '南投县',
                710700: '基隆市',
                710800: '新竹市',
                710900: '嘉义市',
                711100: '新北市',
                711200: '宜兰县',
                711300: '新竹县',
                711400: '桃园市',
                711500: '苗栗县',
                711700: '彰化县',
                711900: '嘉义县',
                712100: '云林县',
                712400: '屏东县',
                712500: '台东县',
                712600: '花莲县',
                712700: '澎湖县',
                712800: '连江县',
                810100: '香港岛',
                810200: '九龙',
                810300: '新界',
                820100: '澳门半岛',
                820200: '离岛',
            },
        },
        selectedCity: [],
        selectedCity1: "",
        selectedCity2: "",
        SE: false,
        CE: false,
        PE: false,
        GE: false,
        FE: false,
        SO: false,
        OT: false,
        RiC: false,
        RiP: false,
        Inte: false,
        randomNumber: parseInt(Math.random() * 100),
        option1: [{
                text: '全部',
                value: 0
            },
            {
                text: '高热度',
                value: 1
            },
            {
                text: '高薪',
                value: 2
            },
            {
                text: '学历',
                value: 3
            }
        ],
        option2: [{
                text: '时间排序',
                value: 'time'
            },
            {
                text: '热度排序',
                value: 'view'
            },
            // {
            //     text: '待遇排序',
            //     value: 'treat'
            // },
        ],
        value1: 0,
        value2: 'time',
    },
    onSearch(event) {
        var that = this;
        // if (event.detail == "") return;
        this.setData({
            searchKey: event.detail
        })
        // console.log(event.detail)
        wx.cloud.callFunction({
            name: 'getRecruitmentData',
            data: {
                action: "getRecruitmentData",
                searchOn: event.detail,
                fliter: event.detail
            },
            success: async res => {
                // console.log(res)
                // // 在这里处理云函数返回的数据
                // console.log(res.result)
                that.dataProcessing(res.result)
            },
            fail: err => {
                console.error('云函数调用失败：', err)
                // 在这里处理云函数调用失败的情况
            }
        })

    },
    dataProcessing(original) {
        if (original == undefined) return;
        for (let i = 0; i < original.length; i++) {
            //字符串 数组化
            original[i].location = original[i].location.split(',');
            original[i].position_A = original[i].position_A.split(',');
            original[i].position_B = original[i].position_B.split(',');
            original[i].position_C = original[i].position_C.split(',');
            original[i].qualification_overseas = original[i].qualification_overseas.split(',');
            original[i].qualification_domestics = original[i].qualification_domestics.split(',');

            if (original[i].location.length > 2) {
                original[i].location_simple = original[i].location.slice(0, 2);
                original[i].location_simple[2] = "...";
            } else {
                original[i].location_simple = original[i].location;
            }

            let dateParts = original[i].update_date.split("/");
            let year = dateParts[0];
            let month = dateParts[1];
            let day = dateParts[2];
            original[i].update_date = `${year}年${month}月${day}日`;
        }
        this.setData({
            recruitment_items: original,
            showOutRecruitmentItems: original.slice(0, 20)
        })
        // console.log(original);
        console.log(this.data.showOutRecruitmentItems)
        return "ca"
    },
    // test(e){
    //   console.log(e.currentTarget.dataset._id)
    // },
    sortingbyUpdateDate(dataSet) {
        if (dataSet == undefined) return;
        // console.log("this is time sorting function")
        for (let i = 0; i < dataSet.length; i++) {
            let update_date_parts = dataSet[i].update_date;
            let match = update_date_parts.match(/(\d+)年(\d+)月(\d+)日/);
            let year = parseInt(match[1]);
            let month = parseInt(match[2]);
            let day = parseInt(match[3]);
            let date_object = new Date(year, month, day);
            let milliseconds = date_object.getTime();
            dataSet[i].ms = milliseconds;
        }
        dataSet.sort(function (a, b) {
            return b.ms - a.ms;
        });
        this.setData({
            recruitment_items: dataSet,
            showOutRecruitmentItems: dataSet.slice(0, 20),
        })
        // console.log(dataSet);
        // console.log(this.data.showOutRecruitmentItems);
    },
    sortignbyViews(dataSet) {
        if (dataSet == undefined) return;
        for (let i = 0; i < dataSet.length; i++) {
            dataSet[i].viewData == undefined ? dataSet[i].viewData = 0 : dataSet[i].viewData = dataSet[i].viewData;
        }
        dataSet.sort(function (a, b) {
            return b.viewData - a.viewData;
        });
        console.log(dataSet)
        this.setData({
            recruitment_items: dataSet,
            showOutRecruitmentItems: dataSet.slice(0, 20),
        })
    },
    sortingbyUpdateSalary(dataSet) {
        if (dataSet == undefined) return;
        dataSet.sort(function (a, b) {
            return b.salary - a.salary;
        });
        this.setData({
            recruitment_items: dataSet,
            showOutRecruitmentItems: dataSet.slice(0, 20),
        })
    },
    onFliterChange(event) {
        if (event == undefined) return;
        var that = this;
        console.log(event.detail)
        // wx.showToast({
        //   title: `切换到标签 ${event.detail.name}`,
        //   icon: 'none',
        // });

        if (event.detail == "") return;
        wx.cloud.callFunction({
            name: 'getRecruitmentData',
            data: {
                action: "getRecruitmentDataHighSalary",
                searchOn: that.data.searchKey,
                fliter: event.detail
            },
            success: async res => {
                console.log(res)
                // 在这里处理云函数返回的数据
                console.log(res.result)
                that.dataProcessing(res.result)
            },
            fail: err => {
                console.error('云函数调用失败：', err)
                // 在这里处理云函数调用失败的情况
            }
        })
    },
    // onEnterpriseChaChange(event) {
    //   this.setData({
    //     enterprise_fliter: event.detail
    //   })
    // },
    onSEChange(event) {
        this.setData({
            SE: event.detail
        })
    },
    onCEChange(event) {
        this.setData({
            CE: event.detail
        })
    },
    onPEChange(event) {
        this.setData({
            PE: event.detail
        })
    },

    onFEChange(event) {
        this.setData({
            FE: event.detail
        })
    },
    onGEChange(event) {
        this.setData({
            GE: event.detail
        })
    },
    onSOChange(event) {
        this.setData({
            SO: event.detail
        })
    },
    onOTChange(event) {
        this.setData({
            OT: event.detail
        })
    },

    onRiCChange(event) {
        this.setData({
            RiC: event.detail
        })
    },
    onRiPChange(event) {
        this.setData({
            RiP: event.detail
        })
    },
    onInteChange(event) {
        this.setData({
            Inte: event.detail
        })
    },


    onSortingChange(event) {
        console.log(event.detail)
        if (event == undefined) return;
        else if (event.detail == 'time') this.sortingbyUpdateDate(this.data.recruitment_items);
        else if (event.detail == 'view') this.sortignbyViews(this.data.recruitment_items);
        else if (event.detail == 'treat') this.sortingbyUpdateSalary(this.data.recruitment_items);
    },
    goRecruitmentDetail(event) {
        console.log(event);
        var viewData = event.currentTarget.dataset.viewdata || 0;
        var _id = event.currentTarget.dataset._id;
        var index = this.data.recruitment_items.findIndex(item => item._id === _id);
        console.log("index的值为：" + index)
        console.log(viewData);
        this.setData({
            [`recruitment_items[${index}].viewData`]: viewData + 1,
        })
        wx.cloud.callFunction({
            name: 'getRecruitmentData', // 云函数的名称
            data: {
                action: "viewData",
                _id: _id,
                viewData: viewData + 1
            },
            success: res => {
                console.log("数据写入成功", res);
            },
            fail: err => {
                console.error("数据写入失败", err);
            }
        });
        wx.navigateTo({
            url: '/pages/recruitment_details/recruitment_details?_id=' + event.currentTarget.dataset._id
        })
    },
    goSalaryDetail(event) {
        wx.navigateTo({
            url: '/pages/salaryDetail/salaryDetail?_id=' + event.currentTarget.dataset.id
        })
    },
    goCommunityDetail(event) {
        wx.navigateTo({
            url: '/pages/communityDetail/communityDetail?_id=' + event.currentTarget.dataset.id
        })
    },
    go(e) {
        wx.navigateTo({
            url: '/pages/webview/webview?website=' + e.currentTarget.dataset.url
        })
    },

    onOpenCitySelect1() {
        this.setData({
            isShowCitySelect1: true
        })
    },

    onOpenCitySelect2() {
        this.setData({
            isShowCitySelect2: true
        })
    },

    onCloseCitySelect1() {
        this.setData({
            isShowCitySelect1: false,
        })
    },

    onCloseCitySelect2() {
        this.setData({
            isShowCitySelect2: false
        })
    },

    onConfirmCitySelect1(event) {
        console.log(event.detail);
        if (event.detail.values[1] == undefined) {
            this.setData({
                isShowCitySelect1: false,
                selectedCity1: ""
            })
            return;
        } else {
            this.setData({
                isShowCitySelect1: false,
                selectedCity1: event.detail.values[0].name == event.detail.values[1].name ? event.detail.values[0].name : event.detail.values[0].name + " " + event.detail.values[1].name,
            })
            console.log(this.data.selectedCity1)
        }

    },

    onConfirmCitySelect2(event) {
        // console.log(event.detail.values);
        if (event.detail.values[1] == undefined) {
            this.setData({
                isShowCitySelect2: false,
                selectedCity2: ""
            })
            return;
        } else {
            this.setData({
                isShowCitySelect2: false,
                selectedCity2: event.detail.values[0].name == event.detail.values[1].name ? event.detail.values[0].name : event.detail.values[0].name + " " + event.detail.values[1].name,
            })
            console.log(this.data.selectedCity2)
        }

    },

    onClickFlitingBtn(event) {
        var that = this;
        let sc1 = this.data.selectedCity1;
        let sc2 = this.data.selectedCity2;
        if (event == undefined) return;
        this.setData({
            selectedCity: [sc1 == "" || undefined ? "" : (sc1.split(" ")[1] == undefined ? (sc1.split(" ")[0].replace(/市$/, "")) : (sc1.split(" ")[1].replace(/市$/, ""))), sc2 == "" || undefined ? "" : (sc2.split(" ")[1] == undefined ? (sc2.split(" ")[0].replace(/市$/, "")) : (sc2.split(" ")[1].replace(/市$/, "")))]
        })
        console.log(this.data)
        // console.log("央企:" + this.data.CE);
        // console.log("国企:" + this.data.SE);
        this.selectComponent('#fliter').toggle();
        wx.cloud.callFunction({
            name: 'getRecruitmentData',
            data: {
                action: "getRecruitmentDataFlitering",
                searchOn: that.data.searchKey,
                CE: (this.data.CE ? '央企' : ''),
                SE: (this.data.CE ? '国企' : ''),
                PE: (this.data.PE ? '民企' : ''),
                FE: (this.data.FE ? '外企' : ''),
                GE: (this.data.GE ? '政府' : ''),
                SO: (this.data.SO ? '社会组织' : ''),
                OT: (this.data.OT ? '' : ''),
                RiC: (this.data.RiC ? '校招' : ''),
                RiP: (this.data.RiP ? '往届' : ''),
                Inte: (this.data.Inte ? '实习' : ''),
                cityFliter: this.data.selectedCity,
            },
            success: async res => {
                console.log(res)
                console.log(res.result)
                that.dataProcessing(res.result)
            },
            fail: err => {
                console.error('云函数调用失败：', err)
            }
        })
    },

    onLoad(options) {
        let a = {
            detail: ""
        };
        this.onSearch(a);
    },


    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        // this.setData({
        //   communities: [],
        //   isCommunitiesMax: false,
        //   random: true
        // })
        // this.search()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachScrollViewBottom() {
        console.log("BOTTOM REACHED.")
        console.log(this.data.recruitment_items.length);
        let items = this.data.recruitment_items;
        let lzyindex = (this.data.lazyindex + 20) > (items.length) ? (items.length) : (this.data.lazyindex + 20);

        // console.log(lzyindex, items)
        this.setData({
            lazyindex: lzyindex,
            showOutRecruitmentItems: items.slice(0, lzyindex)
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})