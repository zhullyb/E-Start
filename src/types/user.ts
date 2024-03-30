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