import Mock from "mockjs";

const Random = Mock.Random;

let ClusterTable = [];
for (let i = 0; i < 5; i++) {
  let template = {
    vies: Random.natural(22, 40),
    url: Random.url(),
   name:Random.date(),
  };
  ClusterTable.push(template);
}

export default {
  "get|api/clusters": option => {
    return {
      status: 200,
      message: "success",
      data: ClusterTable
    };
  }

};

