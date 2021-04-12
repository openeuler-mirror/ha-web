
let resource = [
  {
    status: "Unmanaged",
    colocation: {
      same_node: [
        {
          with_rsc: "ms-drbd",
          rsc: "group-fs-ps",
        },
      ],
      same_node_num: 1,
      diff_node: [],
      diff_node_num: 0,
    },
    running_node: ["ns187"],
    type: "group",
    order: {
      before_rscs: [
        {
          id: "ms-drbd",
        },
      ],
      before_rscs_num: 1,
      after_rscs: [],
      after_rscs_num: 0,
    },
    location: [],
    allow_unmigrate: false,
    subrscs: [
      {
        status: "Running",
        running_node: ["ns187"],
        type: "primitive",
        svc: "Filesystem",
        status_message: "",
        id: "fs-ps",
      },
    ],
    status_message: "",
    id: "group-fs-ps",
  },
  {
    status: "Running",
    colocation: {
      same_node: [],
      same_node_num: 0,
      diff_node: [],
      diff_node_num: 0,
    },
    running_node: ["ns188"],
    type: "primitive",
    svc: "Dummy",
    order: {
      before_rscs: [],
      before_rscs_num: 0,
      after_rscs: [],
      after_rscs_num: 0,
    },
    location: [],
    allow_unmigrate: false,
    status_message: "",
    id: "mydummy2",
  },
  {
    status: "Running",
    colocation: {
      same_node: [],
      same_node_num: 0,
      diff_node: [],
      diff_node_num: 0,
    },
    running_node: ["ns188"],
    type: "group",
    order: {
      before_rscs: [],
      before_rscs_num: 0,
      after_rscs: [],
      after_rscs_num: 0,
    },
    location: [],
    allow_unmigrate: false,
    subrscs: [
      {
        status: "Running",
        running_node: ["ns188"],
        type: "primitive",
        svc: "mysql",
        status_message: "",
        id: "mysql",
      },
    ],
    status_message: "",
    id: "mysql-group",
  },
  {
    status: "Not Running",
    colocation: {
      same_node: [],
      same_node_num: 0,
      diff_node: [],
      diff_node_num: 0,
    },
    running_node: [],
    type: "primitive",
    svc: "CTDB",
    order: {
      before_rscs: [],
      before_rscs_num: 0,
      after_rscs: [],
      after_rscs_num: 0,
    },
    location: [],
    allow_unmigrate: false,
    status_message:
      "* test2_start_0 on ns187 'not installed' (5): call=70, status=complete, exitreason='Setup problem: couldn't find command: /usr/bin/tdbdump', * test2_start_0 on ns188 'not installed' (5): call=953, status=complete, exitreason='Setup problem: couldn't find command: /usr/bin/tdbdump',",
    id: "test2",
  },
  {
    status: "Not Running",
    colocation: {
      same_node: [],
      same_node_num: 0,
      diff_node: [],
      diff_node_num: 0,
    },
    running_node: [],
    type: "group",
    order: {
      before_rscs: [],
      before_rscs_num: 0,
      after_rscs: [],
      after_rscs_num: 0,
    },
    location: [],
    allow_unmigrate: false,
    subrscs: [
      {
        status: "Not Running",
        running_node: [],
        type: "primitive",
        svc: "CTDB",
        status_message: "",
        id: "test1",
      },
      {
        status: "Not Running",
        running_node: [],
        type: "primitive",
        svc: "Filesystem",
        status_message: "",
        id: "iscisi",
      },
    ],
    status_message: "",
    id: "group1",
  },
  {
    status: "Running",
    colocation: {
      same_node: [
        {
          with_rsc: "ms-drbd",
          rsc: "group-fs-ps",
        },
      ],
      same_node_num: 1,
      diff_node: [],
      diff_node_num: 0,
    },
    running_node: ["ns187", "ns188"],
    type: "master",
    order: {
      before_rscs: [],
      before_rscs_num: 0,
      after_rscs: [
        {
          id: "group-fs-ps",
        },
      ],
      after_rscs_num: 1,
    },
    location: [
      {
        node: "ns187",
        level: "Master Node",
      },
      {
        node: "ns188",
        level: "Slave 1",
      },
    ],
    allow_unmigrate: false,
    subrscs: [
      {
        status: "Running",
        running_node: ["ns187"],
        type: "primitive",
        svc: "drbd",
        status_message: "",
        id: "drbd-ps:0",
      },
      {
        status: "Running",
        running_node: ["ns188"],
        type: "primitive",
        svc: "drbd",
        status_message: "",
        id: "drbd-ps:1",
      },
    ],
    status_message: "",
    id: "ms-drbd",
  },
  {
    status: "Running",
    colocation: {
      same_node: [],
      same_node_num: 0,
      diff_node: [],
      diff_node_num: 0,
    },
    running_node: ["ns188"],
    type: "primitive",
    svc: "Dummy",
    order: {
      before_rscs: [],
      before_rscs_num: 0,
      after_rscs: [],
      after_rscs_num: 0,
    },
    location: [],
    allow_unmigrate: true,
    status_message: "",
    id: "mydummy1",
  },
  {
    status: "Not Running",
    colocation: {
      same_node: [],
      same_node_num: 0,
      diff_node: [],
      diff_node_num: 0,
    },
    running_node: [],
    type: "primitive",
    svc: "CTDB",
    order: {
      before_rscs: [],
      before_rscs_num: 0,
      after_rscs: [],
      after_rscs_num: 0,
    },
    location: [],
    allow_unmigrate: false,
    status_message: "",
    id: "y1",
  },
  {
    status: "Running",
    colocation: {
      same_node: [],
      same_node_num: 0,
      diff_node: [],
      diff_node_num: 0,
    },
    running_node: ["ns187", "ns188"],
    type: "clone",
    order: {
      before_rscs: [],
      before_rscs_num: 0,
      after_rscs: [],
      after_rscs_num: 0,
    },
    location: [],
    allow_unmigrate: false,
    subrscs: [
      {
        status: "Running",
        running_node: ["ns187"],
        type: "primitive",
        svc: "IPaddr_6",
        status_message: "",
        id: "ip1:0",
      },
      {
        status: "Running",
        running_node: ["ns188"],
        type: "primitive",
        svc: "IPaddr_6",
        status_message: "",
        id: "ip1:1",
      },
    ],
    status_message: "",
    id: "clone1",
  },
  {
    status: "Not Running",
    colocation: {
      same_node: [],
      same_node_num: 0,
      diff_node: [],
      diff_node_num: 0,
    },
    running_node: [],
    type: "primitive",
    svc: "CTDB",
    order: {
      before_rscs: [],
      before_rscs_num: 0,
      after_rscs: [],
      after_rscs_num: 0,
    },
    location: [],
    allow_unmigrate: false,
    status_message: "",
    id: "y2",
  },
  {
    status: "Running",
    colocation: {
      same_node: [],
      same_node_num: 0,
      diff_node: [],
      diff_node_num: 0,
    },
    running_node: ["ns188"],
    type: "group",
    order: {
      before_rscs: [],
      before_rscs_num: 0,
      after_rscs: [],
      after_rscs_num: 0,
    },
    location: [],
    allow_unmigrate: true,
    subrscs: [
      {
        status: "Running",
        running_node: ["ns188"],
        type: "primitive",
        svc: "Dummy",
        status_message: "",
        id: "dummy4",
      },
    ],
    status_message: "",
    id: "dummy_group1",
  },
]

let drdbStatus = {
  "data": { "code": "1", "message": "实时镜像存储发生故障，请联系技术支持!" }, "error": "error"
}
export default {
  "get|api/resource": option => {
    return {
      status: 200,
      message: "success",
      resource: resource
    };
  },
  "get|api/drbd_status": option => {
    return {
      status: 200,
      message: "success",
      drdbStatus: drdbStatus
    };
  }

};

