package com.itheima.StringDemo;

import java.util.Scanner;

public class StringDemo2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int number;
        while (true){
            System.out.println("请录入金额");
            number = sc.nextInt();
            if(number < 0 || number > 9999999){
                System.out.println("金额无效");
            }else{
                break;
            }
        }
        String result = "";
        while (true){
            int ge = number % 10;

            String r = getCapitalNumber(ge);

            result = r + result;

            number = number / 10;

            if(number == 0){
                break;
            }
        }

        int count = 7 - result.length();

        for (int i = 0; i < count; i++) {
            result = "零" + result;
        }

        String[] str = new String[]{"佰", "拾", "万", "仟", "佰", "拾", "元"};

        String money = "";
        for (int i = 0; i < result.length(); i++) {
            money = money + result.charAt(i) + str[i];
        }

        System.out.println(money);
    }

    public static String getCapitalNumber(int number){
        String result = "";
        String[] arr = new String[]{"零","壹","贰","叁","肆","伍","陆","柒","捌","玖"};
        result = arr[number];
        return result;
    }
}
