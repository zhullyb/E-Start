/**
 * Business
 */
export interface Business {
    /**
     * 地址
     */
    address: string;
    /**
     * 营业时间
     */
    businessHours: string;
    /**
     * 联系方式
     */
    contact: string;
    /**
     * 创建时间
     */
    createdAt: string;
    /**
     * 主键ID
     */
    id: number;
    /**
     * 介绍
     */
    introduction: string;
    /**
     * 导航地址
     */
    loc: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 封面图
     */
    pic: string;
    /**
     * 更新时间
     */
    updatedAt: string;
    [property: string]: any;
}