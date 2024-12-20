package com.itheima.Login;

import java.util.Random;
import java.util.Scanner;

public class Login {
    public static void main(String[] args){
        int code = 0;
        Random r = new Random();
        for (int i = 0; i < 4; i++) {
            int number = r.nextInt(10);
            code = (code *10) + number;
        }
        String verify = code + "";

        System.out.println(verify);
        User userInfo = new User("zhangsan", "123456", verify);



        int count = 0;
        while (true){
            if(count > 2){
                System.out.println("登录失败，当前已达到登录次数上限，请稍后再试");
                break;
            }else{
                if(login(userInfo, verify)){
                    System.out.println("登录成功");
                    break;
                }else{
                    System.out.println("用户名、密码、或验证码错误，请重新输入");
                    count++;
                }
            }
        }
    }

    private static boolean login(User userInfo, String code) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入用户名");
        String username = sc.next();
        System.out.println("请输入密码");
        String password = sc.next();
        System.out.println("请输入验证码");
        String verifycode = sc.next();

        if (username.equals(userInfo.getUsername()) && password.equals(userInfo.getPassword()) && verifycode.equals(userInfo.getVerifycode())) {
            return true;
        } else {
            return false;
        }
    }
}
