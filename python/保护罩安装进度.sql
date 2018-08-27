SELECT a.id AS 工单号,
         b.name a.create AS 工单创建时间,
         a.todo AS 期望执行日期,
         a.create_remark AS 下单备注,
         a.done_time 执行时间,
         do_remark AS 执行备注
FROM ticket_ticket AS a
LEFT JOIN crm_store AS b
    ON a.store_id = b.store_id
WHERE a.create > '2018-08-23'
        AND (create_remark LIKE '%护罩%'
        OR create_remark LIKE '%浮子开关%')