export interface taskList {
    /**
     * 任务校区
     */
    campus: string;
    /**
     * 任务类型，1:主线 2:支线
     */
    category: number;
    /**
     * 任务学院
     */
    college: string;
    /**
     * 创建时间
     */
    createdAt: string;
    /**
     * 任务描述
     */
    desc: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 主键ID
     */
    id: number;
    /**
     * 是否需要完成主线任务
     */
    needMain: boolean;
    /**
     * 奖励积分
     */
    reward: number;
    /**
     * 开始时间
     */
    startTime: string;
    /**
     * 任务名称
     */
    title: string;
    /**
     * 更新时间
     */
    updatedAt: string;
}