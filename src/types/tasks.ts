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
     * 阶段数
     */
    stageNum: number;
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

export interface stage {
    /**
     * 允许距离
     */
    allowDist: number;
    /**
     * 摄像头编号
     */
    cameraId: number;
    /**
     * 创建时间
     */
    createdAt: string;
    /**
     * 阶段任务描述
     */
    desc: string;
    /**
     * 主键ID
     */
    id: number;
    /**
     * 图片，json形式的多张图片
     */
    imgs: string;
    /**
     * 指定位置
     */
    loc: string;
    /**
     * 是否关联摄像头
     */
    needCamera: boolean;
    /**
     * 图片是否需要人脸
     */
    needFace: boolean;
    /**
     * 是否需要指定位置
     */
    needLoc: boolean;
    /**
     * 是否需要导航
     */
    needNav: boolean;
    /**
     * 是否需要上传指定内容图片
     */
    needPic: boolean;
    /**
     * 指定内容图片
     */
    pic: string;
    /**
     * 需要准备的物品
     */
    requiredItem: string;
    /**
     * 阶段
     */
    stage: number;
    /**
     * 所属任务ID
     */
    taskId: number;
    /**
     * 阶段任务名称
     */
    title: string;
    /**
     * 更新时间
     */
    updatedAt: string;
    [property: string]: any;
}