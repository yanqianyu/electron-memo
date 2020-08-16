CREATE SCHEMA todos;

USE todos;

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `todo`;
CREATE TABLE `todo` (
    `id` int(11) NOT NULL COMMENT '主键',
    `content` TEXT NOT NULL COMMENT '内容',
    `isDone` boolean NOT NULL COMMENT '完成情况',
    PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='待办事项';
