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

/**
 * Coupon
 */
export interface Coupon {
    /**
     * 现金金额
     */
    cash: number;
    /**
     * 优惠券类型 1:满减券 2:现金券 3:折扣券
     */
    couponCategory: number;
    /**
     * 创建时间
     */
    createdAt: string;
    /**
     * 折扣
     */
    discount: number;
    /**
     * 有效期类型 1:固定日期 2:有效时长
     */
    expCategory: number;
    /**
     * 固定有效结束日期
     */
    fixedEndTime: string;
    /**
     * 固定有效开始日期
     */
    fixedStartTime: string;
    /**
     * 满
     */
    fullMoney: number;
    /**
     * 主键ID
     */
    id: number;
    /**
     * 减
     */
    minusMoney: number;
    /**
     * 优惠券名称
     */
    name: string;
    /**
     * 每个用户可兑换数量 0:无限制
     */
    redeemCount: number;
    /**
     * 兑换结束时间
     */
    redeemEndTime: string;
    /**
     * 兑换所需积分
     */
    redeemPoints: number;
    /**
     * 兑换开始时间
     */
    redeemStartTime: string;
    /**
     * 剩余数量
     */
    remainCount: number;
    /**
     * 总数量 0:无限制
     */
    totalCount: number;
    /**
     * 更新时间
     */
    updatedAt: string;
    /**
     * 使用说明
     */
    usageInstructions: string;
    /**
     * 有效天数
     */
    validTime: number;
    [property: string]: any;
}