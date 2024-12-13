package com.itheima.Car;

public class Car {
    private String pinpai;
    private double price;
    private String color;


    public Car() {
    }

    public Car(String pinpai, double price, String color) {
        this.pinpai = pinpai;
        this.price = price;
        this.color = color;
    }

    /**
     * 获取
     * @return pinpai
     */
    public String getPinpai() {
        return pinpai;
    }

    /**
     * 设置
     * @param pinpai
     */
    public void setPinpai(String pinpai) {
        this.pinpai = pinpai;
    }

    /**
     * 获取
     * @return price
     */
    public double getPrice() {
        return price;
    }

    /**
     * 设置
     * @param price
     */
    public void setPrice(double price) {
        this.price = price;
    }

    /**
     * 获取
     * @return color
     */
    public String getColor() {
        return color;
    }

    /**
     * 设置
     * @param color
     */
    public void setColor(String color) {
        this.color = color;
    }
}
