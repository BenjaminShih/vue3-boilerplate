module.exports = {
    // 重写提交类型（types）
    types: [{
            value: 'upd',
            name: 'upd(更新): 更新特性，非feat也非fix'
        },
        {
            value: 'feat',
            name: 'feat(新增): 新增一个新的特性'
        },
        {
            value: 'fix',
            name: 'fix(修复): 修复一个Bug'
        },
        {
            value: 'docs',
            name: 'docs(文档): 变更的只有文档'
        },
        {
            value: 'style',
            name: 'style(格式): 空格, 分号等格式修复'
        },
        {
            value: 'refactor',
            name: 'refactor(重构): 代码重构，注意和特性、修复区分开'
        },
        {
            value: 'perf',
            name: 'perf(性能): 提升性能'
        },
        {
            value: 'chore',
            name: 'chore(工具): 开发工具变动(构建、脚手架工具等)'
        },
        {
            value: 'test',
            name: 'test(测试): 代码测试相关'
        },
        {
            value: 'revert',
            name: 'revert(回滚): 代码回退'
        }
    ],
    // 重写提示消息(messages)
    messages: {
        type: '选择提交类型:',
        scope: '本次提交涉及的模块(可选):',
        subject: '短说明:\n',
        body: '长说明:\n',
        breaking: '非兼容性说明 (可选):\n',
        footer: '关联关闭的issue，例如：#31, #34(可选):\n',
        confirmCommit: '确定提交?'
    },
    // 短说明字数限制
    subjectLimit: 100,
    allowBreakingChanges: ['upd', 'feat', 'fix']
};