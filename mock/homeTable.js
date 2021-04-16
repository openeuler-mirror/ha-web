
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
let meta_attributes = { "action": true, "data": { "migration-threshold": { "content": { "type": "integer" }, "name": "migration-threshold" }, "allow-migrate": { "content": { "type": "boolean" }, "name": "allow-migrate" }, "failure-timeout": { "content": { "type": "integer" }, "name": "failure-timeout" }, "priority": { "content": { "type": "integer" }, "name": "priority" }, "resource-stickiness": { "content": { "type": "integer" }, "name": "resource-stickiness" }, "target-role": { "content": { "default": "Stopped", "type": "enum", "values": ["Stopped", "Started"] }, "name": "target-role" }, "multiple-active": { "content": { "type": "enum", "values": ["stop_start", "stop_only", "block"] }, "name": "multiple-active" }, "is-managed": { "content": { "type": "boolean" }, "name": "is-managed" } } };

// let metass={"action":true,
// "data":[
//   {"stonith":["apcmaster","apcmastersnmp","apcsmart","baytech","bladehpi","cyclades","fence_apc","fence_apc_snmp","fence_bladecenter","fence_brocade","fence_cisco_mds","fence_cisco_ucs","fence_compute","fence_drac5","fence_eaton_snmp","fence_emerson","fence_eps","fence_hpblade","fence_ibmblade","fence_idrac","fence_ifmib","fence_ilo","fence_ilo2","fence_ilo3","fence_ilo3_ssh","fence_ilo4","fence_ilo4_ssh","fence_ilo_moonshot","fence_ilo_mp","fence_ilo_ssh","fence_imm","fence_intelmodular","fence_ipdu","fence_ipmilan","fence_kdump","fence_mpath","fence_rhevm","fence_rsa","fence_rsb","fence_sbd","fence_scsi","fence_virsh","fence_virt","fence_vmware_soap","fence_wti","fence_xvm","ibmhmc","ipmilan","meatware","nw_rpc100s","rcd_serial","rps10","suicide","wti_mpc","wti_nps"]},{"systemd":["ModemManager","NetworkManager","NetworkManager-wait-online","abrt-ccpp","abrt-oops","abrt-vmcore","abrt-xorg","abrtd","accounts-daemon","alsa-restore","alsa-state","alsa-store","apparmor","atd","auditd","auth-rpcgss-module","avahi-daemon","blk-availability","brandbot","chronyd","cobra","colord","corosync","cpupower","crond","cups","dbus","dm-event","dmraid-activation","dracut-shutdown","emergency","exim","fcoe","gdm","getty@tty1","gssproxy","ha-api","hypervfcopyd","hypervkvpd","hypervvssd","icinga","ido2db","ip6tables","iptables","irqbalance","iscsi","iscsi-shutdown","iscsid","iscsiuio","kdump","kmod-static-nodes","ksm","ksmtuned","ldconfig","libstoragemgmt","libvirt-guests","libvirtd","livesys","lldpad","lvm2-activation","lvm2-activation-early","lvm2-lvmetad","lvm2-lvmpolld","lvm2-monitor","lvm2-pvscan@252:2","mdmonitor","microcode","multipathd","mysql","neokylinhautils","network","nfs-config","nfs-idmapd","nfs-mountd","nfs-server","nfs-utils","nkucsd","nrpe","ntpd","ntpdate","pacemaker","pacemaker-mgmt","packagekit","plymouth-quit","plymouth-quit-wait","plymouth-read-write","plymouth-start","polkit","postfix","postgresql","qemu-guest-agent","rc-local","rescue","rhel-autorelabel","rhel-autorelabel-mark","rhel-configure","rhel-dmesg","rhel-import-state","rhel-loadmodules","rhel-readonly","rngd","rpc-gssd","rpc-statd","rpc-statd-notify","rpc-svcgssd","rpcbind","rsyslog","rtkit-daemon","sendmail","sm-client","smartd","sntp","spice-vdagentd","sshd","sshd-keygen","syslog","sysstat","systemcenter","systemd-ask-password-console","systemd-ask-password-plymouth","systemd-ask-password-wall","systemd-binfmt","systemd-firstboot","systemd-fsck-root","systemd-hwdb-update","systemd-initctl","systemd-journal-catalog-update","systemd-journal-flush","systemd-journald","systemd-logind","systemd-machine-id-commit","systemd-modules-load","systemd-random-seed","systemd-random-seed-load","systemd-readahead-collect","systemd-readahead-done","systemd-readahead-replay","systemd-reboot","systemd-remount-fs","systemd-shutdownd","systemd-sysctl","systemd-sysusers","systemd-tmpfiles-clean","systemd-tmpfiles-setup","systemd-tmpfiles-setup-dev","systemd-udev-settle","systemd-udev-trigger","systemd-udevd","systemd-update-done","systemd-update-utmp","systemd-update-utmp-runlevel","systemd-user-sessions","systemd-vconsole-setup","tuned","udisks2","unbound-anchor","upower","vmtoolsd","wpa_supplicant","ypbind"]},
//   {"lsb":["CobraApi","cobra","cobrastatus","ha-api","icinga","ido2db","netconsole","network","nkucsd","npcd","nrpe"],"service":["CobraApi","ModemManager","NetworkManager","NetworkManager-wait-online","abrt-ccpp","abrt-oops","abrt-vmcore","abrt-xorg","abrtd","accounts-daemon","alsa-restore","alsa-state","alsa-store","apparmor","atd","auditd","auth-rpcgss-module","avahi-daemon","blk-availability","brandbot","chronyd","cobra","cobrastatus","colord","corosync","cpupower","crond","cups","dbus","dm-event","dmraid-activation","dracut-shutdown","emergency","exim","fcoe","gdm","getty@tty1","gssproxy","ha-api","hypervfcopyd","hypervkvpd","hypervvssd","icinga","ido2db","ip6tables","iptables","irqbalance","iscsi","iscsi-shutdown","iscsid","iscsiuio","kdump","kmod-static-nodes","ksm","ksmtuned","ldconfig","libstoragemgmt","libvirt-guests","libvirtd","livesys","lldpad","lvm2-activation","lvm2-activation-early","lvm2-lvmetad","lvm2-lvmpolld","lvm2-monitor","lvm2-pvscan@252:2","mdmonitor","microcode","multipathd","mysql","neokylinhautils","netconsole","network","nfs-config","nfs-idmapd","nfs-mountd","nfs-server","nfs-utils","nkucsd","npcd","nrpe","ntpd","ntpdate","pacemaker","pacemaker-mgmt","packagekit","plymouth-quit","plymouth-quit-wait","plymouth-read-write","plymouth-start","polkit","postfix","postgresql","qemu-guest-agent","rc-local","rescue","rhel-autorelabel","rhel-autorelabel-mark","rhel-configure","rhel-dmesg","rhel-import-state","rhel-loadmodules","rhel-readonly","rngd","rpc-gssd","rpc-statd","rpc-statd-notify","rpc-svcgssd","rpcbind","rsyslog","rtkit-daemon","sendmail","sm-client","smartd","sntp","spice-vdagentd","sshd","sshd-keygen","syslog","sysstat","systemcenter","systemd-ask-password-console","systemd-ask-password-plymouth","systemd-ask-password-wall","systemd-binfmt","systemd-firstboot","systemd-fsck-root","systemd-hwdb-update","systemd-initctl","systemd-journal-catalog-update","systemd-journal-flush","systemd-journald","systemd-logind","systemd-machine-id-commit","systemd-modules-load","systemd-random-seed","systemd-random-seed-load","systemd-readahead-collect","systemd-readahead-done","systemd-readahead-replay","systemd-reboot","systemd-remount-fs","systemd-shutdownd","systemd-sysctl","systemd-sysusers","systemd-tmpfiles-clean","systemd-tmpfiles-setup","systemd-tmpfiles-setup-dev","systemd-udev-settle","systemd-udev-trigger","systemd-udevd","systemd-update-done","systemd-update-utmp","systemd-update-utmp-runlevel","systemd-user-sessions","systemd-vconsole-setup","tuned","udisks2","unbound-anchor","upower","vmtoolsd","wpa_supplicant","ypbind"]},
//   {"ocf":[
//   {"heartbeat":["CTDB","Cpu_Health","Delay","Disk_Health","Filesystem","IPaddr","IPaddr2","IPaddr_6","IPsrcaddr","IPv6addr","LVM","MailTo","Mem_Health","Route","SAPDatabase","SAPHana","SAPHanaTopology","SAPInstance","SendArp","Squid","VirtualDomain","Xinetd","apache","clvm","conntrackd","db2","dhcpd","docker","ethmonitor","exportfs","galera","iSCSILogicalUnit","iSCSITarget","iface-vlan","mysql","named","nfsnotify","nfsserver","nginx","oracle","oralsnr","pgsql","postfix","rabbitmq-cluster","redis","rsyncd","slapd","symlink","tomcat"]},
//   ,{"linbit":["drbd"]}]},
//   {"pacemaker":["ClusterMon","Dummy","HealthCPU","HealthSMART","Stateful","SysInfo","SystemHealth","controld","ping","pingd","remote"],"openstack":["NovaCompute","NovaEvacuate"]}
// ]};
let metas = [
  {
    value: 'stonith',
    label: 'stonith',
    children:[
      {
      value: 'heartbeat',
      label: 'heartbeat',
      children:[
        {
          value:'CTDB',
          label:'CTDB'
        }
      ]
      }
    ]
  },
  {
    value:'systemd',
    label:'systemd'
  },
  {
    value:'lsb',
    label:'lsb',

  },
  {
    value:'service',
    label:'service'
  },  
  {
    value:'ocf',
    label:'ocf'
  },
]

let metaAttris = {
  "migration-threshold": {
    "content": { "type": "integer" },
    "name": "migration-threshold"
  },
  "allow-migrate": {
    "content": { "type": "boolean" },
    "name": "allow-migrate"
  },
  "failure-timeout": {
    "content": { "type": "integer" },
    "name": "failure-timeout"
  },
  "priority": {
    "content": { "type": "integer" },
    "name": "priority"
  },
  "resource-stickiness": { "content": { "type": "integer" }, "name": "resource-stickiness" }, "target-role": { "content": { "default": "Stopped", "type": "enum", "values": ["Stopped", "Started"] }, "name": "target-role" }, "multiple-active": { "content": { "type": "enum", "values": ["stop_start", "stop_only", "block"] }, "name": "multiple-active" }, "is-managed": { "content": { "type": "boolean" }, "name": "is-managed" }
}
export default {
  "get|api/resource": option => {
    return {
      status: 200,
      message: "success",
      data: resource
    };
  },
  "get|api/drbd_status": option => {
    return {
      status: 200,
      message: "success",
      data: drdbStatus
    };
  },
  "get|api/metas": option => {
    return {
      status: 200,
      message: "success",
      data: metas
    };
  },
  "get|api/meta_attributes": option => {
    return {
      status: 200,
      message: "success",
      data: metaAttris
    };
  },

};

