package com.itheima.Login;

public class User {
    private String username;
    private String password;
    private String verifycode;

    public User(){};

    public User(String username, String password, String verifycode){
        this.username = username;
        this.password = password;
        this.verifycode = verifycode;
    };

    public String getUsername(){
        return this.username;
    };

    public void setUsername(String username){
        this.username= username;
    };

    /**
     * 获取
     * @return password
     */
    public String getPassword() {
        return password;
    }


    /**
     * 设置
     * @param password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * 获取
     * @return verifycode
     */
    public String getVerifycode() {
        return verifycode;
    }

    /**
     * 设置
     * @param verifycode
     */
    public void setVerifycode(String verifycode) {
        this.verifycode = verifycode;
    }
}
