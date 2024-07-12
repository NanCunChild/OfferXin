// 云函数入口文件
const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  console.log("event.sear", event.searchOn);
  switch (event.action) {
    case "getRecruitmentData": {
      return getRecruitmentData(event, wxContext);
    }
    case "getRecommandData": {
      return getRecommandData(event, wxContext);
    }
    case "getRecent20Data": {
      return getRecent20Data(event, wxContext);
    }
    case "getInternalData": {
      return getInternalData(event, wxContext);
    }
    case "getInternshipData": {
      return getInternshipData(event, wxContext);
    }
    case "searchRecruit": {
      return getSearchRecruitData(event);
    }
    case "getDataTestFliter": {
      return getDataTestFliter(event, wxContext);
    }
    case "getDatabyId": {
      return getDatabyId(event, wxContext);
    }
    case "getRecruitmentDataHighSalary": {
      return getRecruitmentDataHighSalary(event, wxContext);
    }
    case "getRecruitmentDataGoodComment": {
      return getRecruitmentDataGoodComment(event, wxContext);
    }
    case "getRecruitmentDataHot": {
      return getRecruitmentDataHot(event, wxContext);
    }
    case "getRecruitmentDataFlitering": {
      return getRecruitmentDataFlitering(event, wxContext);
    }
    case "viewData": {
      return viewData(event, wxContext);
    }
    default: {
      return "IIIOOO";
    }
  }
};

async function getRecruitmentData(event, wxContext) {
  try {
    // console.log(JSON.stringify(event))
    console.log(event.searchOn);
    let count = await db.collection("RecruitmentsSet").count();
    count = count.total;
    console.log(count);
    if (count > 300) {
      count = 300;
    }
    // 2，通过for循环做多次请求，并把多次请求的数据放到一个数组里
    let all = [];
    for (let i = 0; i < count; i += 100) {
      //自己设置每次获取数据的量
      let list = await db
        .collection("RecruitmentsSet")
        .where(
          db.command.or([
            {
              recruitment_name: db.RegExp({
                regexp: ".*" + event.searchOn + ".*",
                options: "i",
              }),
            },
            {
              company_name: db.RegExp({
                regexp: ".*" + event.searchOn + ".*",
                options: "i",
              }),
            },
          ])
        )
        .orderBy("update_date", "desc")
        .skip(i)
        .get();
      console.log(list.data);
      all = all.concat(list.data);
    }
    // 3,把组装好的数据一次性全部返回
    return all;
    const result = await db
      .collection("RecruitmentsSet")
      .where(
        db.command.or([
          {
            recruitment_name: db.RegExp({
              regexp: ".*" + event.searchOn + ".*",
              options: "i",
            }),
          },
          {
            company_name: db.RegExp({
              regexp: ".*" + event.searchOn + ".*",
              options: "i",
            }),
          },
        ])
      )
      .orderBy("update_date", "desc")
      .get();
    // console.log("hhhhhjas")
    return result.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getRecommandData(event, wxContext) {
  const size = event.size ? event.size : 1; // 需要推荐几条数据
  try {
    const result = await db
      .collection("RecommandSet")
      .aggregate()
      .sample({ size })
      .end();
    console.log("recommand.data", result);
    return result.list;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getRecent20Data(event, wxContext) {
  const type = event.type;
  try {
    const currentDate = new Date();
    const twentyDaysAgo = new Date(
      currentDate.getTime() - 20 * 24 * 60 * 60 * 1000
    );

    // 格式化日期为 "YYYY/MM/DD"
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}/${month}/${day}`;
    };

    const twentyDaysAgoStr = formatDate(twentyDaysAgo);
    // 第一步：获取所有符合条件的文档的ID
    const getIds = async (tableName) => {
      const result = await db
        .collection(tableName)
        .where({
          update_date: _.gte(twentyDaysAgoStr),
        })
        .get({
          fields: ["_id"], // 只选择 _id 字段，以减少数据传输量
        });

      return result.data.map((item) => item._id);
    };

    // 第二步：从ID中随机选择五个
    const getRandomIds = (ids) => {
      // 如果ids数量小于或等于5，直接返回所有ids
      if (ids.length <= 5) {
        return ids;
      }

      // 使用Fisher-Yates洗牌算法随机排序数组
      for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
      }

      // 返回前五个元素
      return ids.slice(0, 5);
    };

    // 第三步：使用随机选择的ID获取实际数据
    const queryRandomData = async (tableName) => {
      const ids = await getIds(tableName);
      const randomIds = getRandomIds(ids);

      // 使用in_查询来获取这些ID对应的数据
      const result = await db
        .collection(tableName)
        .where({
          _id: _.in(randomIds),
        })
        .get();

      return result.data;
    };
    let result = await queryRandomData(type);
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getInternalData(event, wxContext) {
  try {
    const result = await db
      .collection("InternalSet")
      .where(
        db.command.or([
          {
            recruitment_name: db.RegExp({
              regexp: ".*" + event.searchOn + ".*",
              options: "i",
            }),
          },
          {
            company_name: db.RegExp({
              regexp: ".*" + event.searchOn + ".*",
              options: "i",
            }),
          },
        ])
      )
      .orderBy("update_date", "desc")
      .get();
    console.log("result.data", result.data);
    return result.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getInternshipData(event, wxContext) {
  try {
    const result = await db
      .collection("InternshipSet")
      .where(
        db.command.or([
          {
            recruitment_name: db.RegExp({
              regexp: ".*" + event.searchOn + ".*",
              options: "i",
            }),
          },
          {
            company_name: db.RegExp({
              regexp: ".*" + event.searchOn + ".*",
              options: "i",
            }),
          },
        ])
      )
      .orderBy("update_date", "desc")
      .get();
    return result.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getSearchRecruitData(event) {
  const condition = db.command.or([
    {
      recruitment_name: db.RegExp({
        regexp: ".*" + event.searchOn + ".*",
        options: "i",
      }),
    },
    {
      company_name: db.RegExp({
        regexp: ".*" + event.searchOn + ".*",
        options: "i",
      }),
    },
  ]);

  try {
    console.log(event.searchOn);
    const result1 = db.collection("RecruitmentsSet").where(condition).get();
    const result2 = db.collection("InternalSet").where(condition).get();
    const result3 = db.collection("InternshipSet").where(condition).get();
    const res = await Promise.all([result1, result2, result3]);
    return [...res[0].data, ...res[1].data, ...res[2].data];
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getDataTestFliter(event, wxContext) {
  console.log(JSON.stringify(event));
  try {
    const result = await db
      .collection("RecruitmentsSet")
      .where(
        db.command.and([
          db.command.or([
            {
              recruitment_name: db.RegExp({
                regexp: ".*" + event.searchOn + ".*",
                options: "i",
              }),
            },
            {
              company_name: db.RegExp({
                regexp: ".*" + event.searchOn + ".*",
                options: "i",
              }),
            },
          ]),
          db.command.or([
            {
              company_character: event.SE,
            },
            {
              company_character: event.CE,
            },
          ]),
          db.command.and([
            {
              company_location: db.RegExp({
                regexp: ".*" + event.cityFliter[0] + ".*",
                options: "i",
              }),
            },
            {
              company_location: db.RegExp({
                regexp: ".*" + event.cityFliter[0] + ".*",
                options: "i",
              }),
            },
          ]),
        ])
      )
      .get({
        success: function (res) {
          console.log(res.data);
        },
      });
    return result.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function getDatabyId(event, wxContext) {
  console.log("event", event);
  try {
    console.log(event.searchOn);
    const result = await db
      .collection(event.dbName)
      .where({
        _id: event.searchOn,
      })
      .get({
        success: function (res) {
          console.log(res.data);
        },
      });
    return result.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function getRecruitmentDataHighSalary(event, wxContext) {
  try {
    // console.log(JSON.stringify(event))
    // console.log(event.searchOn);
    const result = await db
      .collection("RecruitmentsSet")
      .where(
        db.command.or([
          {
            recruitment_name: db.RegExp({
              regexp: ".*" + event.searchOn + ".*",
              options: "i",
            }),
          },
          {
            company_name: db.RegExp({
              regexp: ".*" + event.searchOn + ".*",
              options: "i",
            }),
          },
        ])
      )
      .where(
        db.command.and([
          {
            salary: db.command.gt(6000), // 大于 6000 的条件
          },
        ])
      )
      .get({
        success: function (res) {
          console.log(res.data);
        },
      });
    return result.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function getRecruitmentDataGoodComment(event, wxContext) {
  try {
    // console.log(JSON.stringify(event))
    // console.log(event.searchOn);
    const result = await db
      .collection("RecruitmentsSet")
      .where(
        db.command.or([
          {
            recruitment_name: db.RegExp({
              regexp: ".*" + event.searchOn + ".*",
              options: "i",
            }),
          },
          {
            company_name: db.RegExp({
              regexp: ".*" + event.searchOn + ".*",
              options: "i",
            }),
          },
        ])
      )
      .where(
        db.command.and([
          {
            goodCommant: db.command.gt(100),
          },
        ])
      )
      .get({
        success: function (res) {
          console.log(res.data);
        },
      });
    return result.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function getRecruitmentDataHot(event, wxContext) {
  try {
    const result = await db
      .collection("RecruitmentsSet")
      .where(
        db.command.or([
          {
            recruitment_name: db.RegExp({
              regexp: ".*" + event.searchOn + ".*",
              options: "i",
            }),
          },
          {
            company_name: db.RegExp({
              regexp: ".*" + event.searchOn + ".*",
              options: "i",
            }),
          },
        ])
      )
      .where(
        db.command.and([
          {
            viewed: db.command.gt(100),
          },
        ])
      )
      .get({
        success: function (res) {
          console.log("res.data", res.data);
        },
      });
    return result.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function getRecruitmentDataFlitering(event, wxContext) {
  console.log("======>", JSON.stringify(event));
  console.log(event.cityFliter[0]);
  try {
    const tabIndex = event.tabIndex;
    let dbName = "RecruitmentsSet";
    if (tabIndex === 0) {
      dbName = "RecruitmentsSet";
    } else if (tabIndex === 1) {
      dbName = "InternalSet";
    } else {
      dbName = "InternshipSet";
    }

    const queryConditions = [
      event.SE,
      event.CE,
      event.FE,
      event.GE,
      event.SO,
      event.OT,
      event.PE,
    ]
      .filter((condition) => !!condition)
      .map((condition) => ({ company_character: condition }));

    const query =
      queryConditions.length > 0
        ? db.command.and([
            db.command.or([
              {
                recruitment_name: db.RegExp({
                  regexp: ".*" + event.searchOn + ".*",
                  options: "i",
                }),
              },
              {
                company_name: db.RegExp({
                  regexp: ".*" + event.searchOn + ".*",
                  options: "i",
                }),
              },
            ]),
            db.command.or(queryConditions),
            db.command.and([
              {
                location: db.RegExp({
                  regexp:
                    event.cityFliter[0] == ""
                      ? ".*"
                      : ".*" + event.cityFliter[0] + ".*",
                  options: "i",
                }),
              },
              {
                location: db.RegExp({
                  regexp:
                    event.cityFliter[1] == ""
                      ? ".*"
                      : ".*" + event.cityFliter[1] + ".*",
                  options: "i",
                }),
              },
            ]),
          ])
        : db.command.and([
            db.command.or([
              {
                recruitment_name: db.RegExp({
                  regexp: ".*" + event.searchOn + ".*",
                  options: "i",
                }),
              },
              {
                company_name: db.RegExp({
                  regexp: ".*" + event.searchOn + ".*",
                  options: "i",
                }),
              },
            ]),
            db.command.and([
              {
                location: db.RegExp({
                  regexp:
                    event.cityFliter[0] == ""
                      ? ".*"
                      : ".*" + event.cityFliter[0] + ".*",
                  options: "i",
                }),
              },
              {
                location: db.RegExp({
                  regexp:
                    event.cityFliter[1] == ""
                      ? ".*"
                      : ".*" + event.cityFliter[1] + ".*",
                  options: "i",
                }),
              },
            ]),
          ]);

    const result = await db.collection(dbName).where(query).get();
    console.log("result", result);
    return result.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function viewData(event, wxContext) {
  const _id = event._id;
  const viewData = event.viewData;
  const dbName = event.dbName;
  db.collection(dbName)
    .doc(_id)
    .update({
      data: {
        viewData: viewData,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}
