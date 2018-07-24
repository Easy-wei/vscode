select 
    t.id,
    t.`create` '创建时间',
    u_c.username '创建人',
    s.name '门店名称',
    s.id '门店ID',
    CASE t.main_type
        when 1 then '测量'
        when 2 then '安装'
        when 3 then '试机'
        when 4 then '培训'
        when 5 then '维修'
        when 6 then '巡检'
        when 7 then '配送'
        when 8 then '其他'
    end '主类型',
    case t.sub_type
        WHEN 101 THEN "测量"
        WHEN 201 THEN "安装机器(有水池)"
        WHEN 202 THEN "安装机器(无水池)"
        WHEN 203 THEN "安装平台"
        WHEN 204 THEN "安装分配器"
        WHEN 205 THEN "安装隔油池"
        WHEN 206 THEN "安装花洒"
        WHEN 207 THEN "安装水枪"
        WHEN 208 THEN "安装水龙头"
        WHEN 301 THEN "试机"
        WHEN 401 THEN "培训"
        WHEN 402 THEN "洗不干净"
        WHEN 501 THEN "维修机器"
        WHEN 502 THEN "维修平台"
        WHEN 503 THEN "维修分配器"
        WHEN 504 THEN "维修其他"
        WHEN 601 THEN "巡检揭盖机"
        WHEN 602 THEN "巡检非揭盖机"
        WHEN 701 THEN "人工配送"
        WHEN 702 THEN "快递配送"
        WHEN 801 THEN "办入场证"
        WHEN 802 THEN "拉线"
        WHEN 803 THEN "拉线验收"
        WHEN 804 THEN "移机"
        WHEN 805 THEN "客情"
        WHEN 806 THEN "公司教学"
        WHEN 807 THEN "仓库作业"
        WHEN 808 THEN "质检"
        WHEN 809 THEN "撤机"
        WHEN 810 THEN "办出场证"
        WHEN 811 THEN "其他"
    END '子类型',
--   /* todo '期望执行时间', 暂时不用此字*/
    t.create_remark '发单备注',
    case t.stage
        when 1 then '待派单'
        when 2 then '待分配'
        when 3 then '待执行'
        when 4 then '待评价'
        when 5 then '待回访'
        when 6 then '已回访'
        when 7 then '已关闭'
    end '工单状态',
 --   if(t.point = 1,'是','否') '积分是否有效',
    /* if(t.warehouse = 1,'是','否') '是否需要仓库发货',暂时不用此字段*/
    t.dispatcher_time '调度时间',
    if(t.reason = 1,'客户原因','非客户原因') '是否客户原因',
    t.dispatcher_remark '调度备注',
 --   t.distribute_time  '分配时间',
 --   t.do_time '区长指定执行时间',
    u_me.username '责任工程师',
    u_me.username '参与工程师',
    t.dispatcher_remark '分配备注',
    t.task_start '到店时间',
    t.task_done '离店时间',
    t.do_remark '执行备注',
 --   done_time '完成时间',
    if(t.solve = 1,'是','否') '问题是否解决',
    if(t.running = 1,'是','否') '是否可以试机',
 --   t.review_time '评价时间',
 --   if(t.night_install = 1,'是','否') '是否夜间安装',
 --   if(t.complex_install = 1,'是','否') '是否复杂安装',
    if(t.complex_repair = 1,'是','否') '是否复杂维修',
 /*   case t.quality
        when 1 then '超出预期'
        when 2 then '符合预期'
        when 3 then '低于预期'
        when 4 then '不可接受'
        when 5 then '极度超出预期'
        when 6 then '极度低于预期'
    end '任务质量评价', 
    case t.accident
        when 0 then '无事故'
        when 1 then '一级事故'
        when 2 then '二级事故'
        when 3 then '三级事故'
        when 4 then '四级事故'
    end '事故定级',   
    t.review_remark '评价备注',
    t.return_time '回访时间',
    if(t.convention = 1,'是','否') '是否常规工单',
    if(t.violation = 1,'是','否') '工单是否违规',
    t.violation_reason '违规原因',
    if(t.accept = 1,'是','否') '商家是否认可',
    if(t.following = 1,'是','否') '客服是否需继续跟踪', */
    t.return_remark '回访备注',
     CONCAT('<a href="http://oss.honganhome.com/admin/ticket/ticket/?id=',t.id,'" target="_blank">','链接','</a>') 'OSS链接'
from
    ticket_ticket t
    LEFT JOIN crm_store s ON t.store_id = s.id
    LEFT JOIN auth_user u_c ON u_c.id = t.creator_id
/*  上面这句话应该有问题， 因为 auth_user.id = ticket_ticket.creator_id 可是下面就一句话一就变成
    可是下面就一句话一就变成了可是下面就一句话一就变成了auth_user.id = ticket_ticket.master_engineer_id
    同样auth_user.id 对应了t表里的creator和t表的master_engineer_id，所以不太明白，还望真宇解答。
*/
    LEFT JOIN auth_user u_me ON t.master_engineer_id = u_me.id
    LEFT JOIN auth_user u_se ON t.slave_engineer_id = u_se.id
--  上面的这句话是废话，ticket 的slave_engineer_id是空的,可以删除的 ，上上句已经调用了auth_user表了，不用再次声明调用了
    JOIN assets_assetsrecord ast ON t.store_id = ast.store_id and ast.sku_id =77
where 
    t.main_type = 6 and date(t.task_start)>= '2018-05-30'
order by t.id desc    