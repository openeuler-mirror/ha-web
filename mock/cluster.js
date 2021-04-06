import Mock from "mockjs";

const Random = Mock.Random;

let commands = {
    '1': "crm_mon -1 -o",
    '2': "crm_simulate -Ls",
    '3': "pcs config show",
    '4': "corosync-cfgtool -s",
    '5': "crm configure verify"
}
let commandResult = {
    data: "Stack: corosync\nCurrent DC: ns175 (version 1.1.16-12.el7.1-94ff4df) - partition with quorum\nLast updated: Thu Jun  7 15:55:05 2018\nLast change: Wed Jun  6 10:56:10 2018 by root via mgmtd on ns175\n\n2 nodes configured\n19 resources configured (23 DISABLED)\n\nOnline: [ ns175 ]\nOFFLINE: [ ns176 ]\n\nActive resources:\n\n dummy\t(ocf::heartbeat:Dummy):\tStarted ns175\n test2\t(ocf::heartbeat:Dummy):\tStarted ns175\n\nOperations:\n* Node ns175:\n   dummy: migration-threshold=1000000\n    + (60) start: rc=0 (ok)\n   test2: migration-threshold=1000000\n    + (61) start: rc=0 (ok)\n   vip: migration-threshold=1000000\n    + (16) probe: rc=0 (ok)\n    + (21) stop: rc=0 (ok)\n   gfs: migration-threshold=1000000\n    + (43) probe: rc=0 (ok)\n    + (46) stop: rc=0 (ok)\n   net: migration-threshold=1000000\n    + (65) probe: rc=0 (ok)\n    + (66) stop: rc=0 (ok)\n   color: migration-threshold=1000000\n    + (70) probe: rc=0 (ok)\n    + (71) stop: rc=0 (ok)"
}
let hbstatus = {
    hbaddrs1: [{ ip: "192.168.100.187", nodeid: "ns187" }, { ip: "192.168.100.188", nodeid: "ns188" }],
    hbaddrs2: [{ ip: "192.168.100.187", nodeid: "ns187" }, { ip: "192.168.100.188", nodeid: "ns188" }]
}
let ret = {
    data: {
      name: 'Policy Engine',
      parameters: {
        'node-health-green': {
          enabled: 1,
          name: 'node-health-green',
          value: '10',
          content: {
            default: '0',
            type: 'integer',
            unit: '',
          },
          shortdesc: "The score 'green' translates to in rsc_location constraints",
          // unique: '0',
          longdesc: 'Only used when node-health-strategy is set to custom or progressive.',
        },
        'load-threshold': {
          enabled: 1,
          name: 'load-threshold',
          value: '80',
          content: {
            default: '80',
            type: 'percentage',
            unit: '%',
          },
          shortdesc: "The score 'green' translates to in rsc_location constraints",
          // unique: '0',
          longdesc: '%',
        },
        'load-min': {
          enabled: 1,
          name: 'load-min',
          value: '23',
          content: {
            default: '23',
            type: 'time',
            unit: 'min',
          },
          shortdesc: "The score 'green' translates to in rsc_location constraints",
          // unique: '0',
          longdesc: 'min',
        },
        'load-s': {
          enabled: 1,
          name: 'load-s',
          value: '10',
          content: {
            default: '10',
            type: 'time',
            unit: 's'
          },
          shortdesc: "The score 'green' translates to in rsc_location constraints",
          // unique: '0',
          longdesc: 's',
        },
        'placement-strategy': {
          enabled: 0,
          name: 'placement-strategy',
          value: 'default',
          content: {
            default: 'default',
            values: [
              'default',
              'utilization',
              'minimal',
              'balanced',
            ],
            type: 'enum',
            unit: '',
          },
          shortdesc: 'The strategy to determine resource placement',
          // unique: '0',
          longdesc: 'The strategy to determine resource placement  Allowed values: default, utilization, minimal, balanced',
        },
        'symmetric-cluster': {
          enabled: 1,
          name: 'symmetric-cluster',
          value: 'true',
          content: {
            default: 'true',
            type: 'boolean',
            unit: '',
          },
          shortdesc: 'All resources can run anywhere by default',
          // unique: '0',
          longdesc: 'All resources can run anywhere by default',
        },
        'pe-input-series-max': {
          enabled: 0,
          name: 'pe-input-series-max',
          value: '4000',
          content: {
            default: '4000',
            type: 'integer',
            unit: '',
          },
          shortdesc: 'The number of other PE inputs to save',
          // unique: '0',
          longdesc: 'Zero to disable, -1 to store unlimited.',
        },
        'maintenance-mode': {
          enabled: 1,
          name: 'maintenance-mode',
          value: 'false',
          content: {
            default: 'false',
            type: 'boolean',
            unit: '',
          },
          shortdesc: 'Should the cluster monitor resources and start/stop them as required',
          // unique: '0',
          longdesc: 'Should the cluster monitor resources and start/stop them as required',
        },
        'startup-fencing': {
          enabled: 0,
          name: 'startup-fencing',
          value: 'true',
          content: {
            default: 'true',
            type: 'boolean',
            unit: '',
          },
          shortdesc: 'STONITH unseen nodes',
          // unique: '0',
          longdesc: 'Advanced Use Only!  Not using the default is very unsafe!',
        },
        'node-health-yellow': {
          enabled: 1,
          name: 'node-health-yellow',
          value: '0',
          content: {
            default: '0',
            type: 'integer',
            unit: '',
          },
          shortdesc: "The score 'yellow' translates to in rsc_location constraints",
          // unique: '0',
          longdesc: 'Only used when node-health-strategy is set to custom or progressive.',
        },
        'start-failure-is-fatal': {
          enabled: 1,
          name: 'start-failure-is-fatal',
          value: 'true',
          content: {
            default: 'true',
            type: 'boolean',
            unit: '',
          },
          shortdesc: 'Always treat start failures as fatal',
          // unique: '0',
          longdesc: "This was the old default.  However when set to FALSE, the cluster will instead use the resource's failcount and value for resource-failure-stickiness",
        },
        'enabled-startup-probes': {
          enabled: 0,
          name: 'enabled-startup-probes',
          value: 'true',
          content: {
            default: 'true',
            type: 'boolean',
            unit: '',
          },
          shortdesc: 'Should the cluster check for active resources during startup',
          // unique: '0',
          longdesc: 'Should the cluster check for active resources during startup',
        },
        'stop-orphan-actions': {
          enabled: 0,
          name: 'stop-orphan-actions',
          value: 'true',
          content: {
            default: 'true',
            type: 'boolean',
            unit: '',
          },
          shortdesc: 'Should deleted actions be cancelled',
          // unique: '0',
          longdesc: 'Should deleted actions be cancelled',
        },
        'stop-all-resources': {
          enabled: 0,
          name: 'stop-all-resources',
          value: 'false',
          content: {
            default: 'false',
            type: 'boolean',
            unit: '',
          },
          shortdesc: 'Should the cluster stop all active resources (except those needed for fencing)',
          // unique: '0',
          longdesc: 'Should the cluster stop all active resources (except those needed for fencing)',
        },
        'default-resource-stickiness': {
          enabled: 0,
          name: 'default-resource-stickiness',
          value: '0',
          content: {
            default: '0',
            type: 'integer',
            unit: '',
          },
          shortdesc: '',
          // unique: '0',
          longdesc: '',
        },
        'no-quorum-policy': {
          enabled: 1,
          name: 'no-quorum-policy',
          value: 'ignore',
          content: {
            default: 'stop',
            values: [
              'stop',
              'freeze',
              'ignore',
              'suicide',
            ],
            type: 'enum',
            unit: '',
          },
          shortdesc: 'What to do when the cluster does not have quorum',
          // unique: '0',
          longdesc: 'What to do when the cluster does not have quorum  Allowed values: stop, freeze, ignore, suicide',
        },
        'node-health-red': {
          enabled: 1,
          name: 'node-health-red',
          value: '-INFINITY',
          content: {
            default: '-INFINITY',
            type: 'integer',
            unit: '',
          },
          shortdesc: "The score 'red' translates to in rsc_location constraints",
          // unique: '0',
          longdesc: 'Only used when node-health-strategy is set to custom or progressive.',
        },
        'batch-limit': {
          enabled: 0,
          name: 'batch-limit',
          value: '0',
          content: {
            default: '0',
            type: 'integer',
            unit: '',
          },
          shortdesc: 'The number of jobs that the TE is allowed to execute in parallel',
          // unique: '0',
          longdesc: "The 'correct' value will depend on the speed and load of your network and cluster nodes.",
        },
        'concurrent-fencing': {
          enabled: 0,
          name: 'concurrent-fencing',
          value: 'false',
          content: {
            default: 'false',
            type: 'boolean',
            unit: '',
          },
          shortdesc: 'Allow performing fencing operations in parallel',
          // unique: '0',
          longdesc: 'Allow performing fencing operations in parallel',
        },
        'stonith-enabledd': {
          enabled: 1,
          name: 'stonith-enabledd',
          value: 'false',
          content: {
            default: 'true',
            type: 'boolean',
            unit: '',
          },
          shortdesc: "Failed nodes are STONITH'd",
          // unique: '0',
          longdesc: "Failed nodes are STONITH'd",
        },
        'have-watchdog': {
          enabled: 0,
          name: 'have-watchdog',
          value: 'false',
          content: {
            default: 'false',
            type: 'boolean',
            unit: '',
          },
          shortdesc: 'enabled watchdog integration',
          // unique: '0',
          longdesc: 'Set automatically by the cluster if SBD is detected.  User configured values are ignored.',
        },
        'stop-orphan-resources': {
          enabled: 0,
          name: 'stop-orphan-resources',
          value: 'true',
          content: {
            default: 'true',
            type: 'boolean',
            unit: '',
          },
          shortdesc: 'Should deleted resources be stopped',
          // unique: '0',
          longdesc: 'Should deleted resources be stopped',
        },
        'stonith-action': {
          enabled: 0,
          name: 'stonith-action',
          value: 'reboot',
          content: {
            default: 'reboot',
            values: [
              'reboot',
              'poweroff',
              'off',
            ],
            type: 'enum',
            unit: '',
          },
          shortdesc: 'Action to send to STONITH device',
          // unique: '0',
          longdesc: 'Action to send to STONITH device  Allowed values: reboot, poweroff, off',
        },
        'pe-warn-series-max': {
          enabled: 0,
          name: 'pe-warn-series-max',
          value: '5000',
          content: {
            default: '5000',
            type: 'integer',
            unit: '',
          },
          shortdesc: 'The number of PE inputs resulting in WARNINGs to save',
          // unique: '0',
          longdesc: 'Zero to disable, -1 to store unlimited.',
        },
        'pe-error-series-max': {
          enabled: 0,
          name: 'pe-error-series-max',
          value: '-1',
          content: {
            default: '-1',
            type: 'integer',
            unit: '',
          },
          shortdesc: 'The number of PE inputs resulting in ERRORs to save',
          // unique: '0',
          longdesc: 'Zero to disable, -1 to store unlimited.',
        },
        'migration-limit': {
          enabled: 0,
          name: 'migration-limit',
          value: '-1',
          content: {
            default: '-1',
            type: 'integer',
            unit: '',
          },
          shortdesc: 'The number of migration jobs that the TE is allowed to execute in parallel on a node',
          // unique: '0',
          longdesc: 'The number of migration jobs that the TE is allowed to execute in parallel on a node',
        },
        'is-managed-default': {
          enabled: 0,
          name: 'is-managed-default',
          value: 'true',
          content: {
            default: 'true',
            type: 'boolean',
            unit: '',
          },
          shortdesc: 'Should the cluster start/stop resources as required',
          // unique: '0',
          longdesc: 'Should the cluster start/stop resources as required',
        },
        'node-health-strategy': {
          enabled: 1,
          name: 'node-health-strategy',
          value: 'custom',
          content: {
            default: 'none',
            values: [
              'none',
              'migrate-on-red',
              'only-green',
              'progressive',
              'custom',
            ],
            type: 'enum',
            unit: '',
          },
          shortdesc: 'The strategy combining node attributes to determine overall node health.',
          // unique: '0',
          longdesc: "Requires external entities to create node attributes (named with the prefix '#health') with values: 'red', 'yellow' or 'green'.  Allowed values: none, migrate-on-red, only-green, progressive, custom",
        },
        'remove-after-stop': {
          enabled: 0,
          name: 'remove-after-stop',
          value: 'false',
          content: {
            default: 'false',
            type: 'boolean',
            unit: '',
          },
          shortdesc: 'Remove resources from the LRM after they are stopped',
          // unique: '0',
          longdesc: 'Always set this to false.  Other values are, at best, poorly tested and potentially dangerous.',
        },
      },
      shortdesc: 'Policy Engine Options',
      version: '1.0',
      nodecount: 2,
      isconfig: true,
      longdesc: 'This is a fake resource that details the options that can be configured for the Policy Engine.',
    },
  }


export default {
    "get|api/commands": option => {
        return {
            status: 200,
            message: "success",
            commands: commands
        };
    },
    "get|api/commandResult": req => {
        let result = {}
        switch (req.body) {
            case 'x':
                break;
            default:
                result = commandResult.data
                break;
        }
        return {
            status: 200,
            message: "success",
            result: result
        };
    },
    "get|api/configs": option => {
        return {
            status: 200,
            message: "success",
            hbstatus: hbstatus
        };
    },
    "get|api/v1/clusters/1": option => {
        return {
            status: 200,
            message: "success",
            ret: ret.data
        };
    }

};

