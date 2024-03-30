export interface studentInfo {
    /**
     * 入学年份
     */
    admissionYear: number;
    /**
     * 出生日期
     */
    birthday: string;
    /**
     * 校区
     */
    campus: string;
    /**
     * 班级
     */
    class: string;
    /**
     * 学院
     */
    college: string;
    /**
     * 创建时间
     */
    createdAt: string;
    /**
     * 寝室
     */
    dormitory: string;
    /**
     * 性别
     */
    gender: string;
    /**
     * 主键ID
     */
    id: number;
    /**
     * 专业
     */
    major: string;
    /**
     * 姓名
     */
    name: string;
    /**
     * 生源地
     */
    originPlace: string;
    /**
     * 人像
     */
    portrait: string;
    /**
     * 学号
     */
    studentId: string;
    /**
     * 更新时间
     */
    updatedAt: string;
    [property: string]: any;
}

export interface info {
    /**
     * 头像
     */
    avatar: string;
    /**
     * 创建时间
     */
    createdAt: string;
    /**
     * 当前任务，=0说明当前没有正在执行任务
     */
    curTask: number;
    /**
     * 经验值，智慧种子
     */
    exp: number;
    /**
     * 爱好
     */
    hobby: string;
    /**
     * 主键ID
     */
    id: number;
    /**
     * 是否完成主线任务
     */
    isCompletedMain: boolean;
    /**
     * 积分，求索石
     */
    points: number;
    /**
     * 个性签名
     */
    signature: string;
    /**
     * 关联学生信息，=0说明未经过认证
     */
    studentInfoId: number;
    /**
     * 更新时间
     */
    updatedAt: string;
    /**
     * 用户名
     */
    username: string;
    [property: string]: any;
}