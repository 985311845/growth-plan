public class Student {
    private String id;
    private String name;
    private int age;
    private String address;

    public Student(){};

    public Student(String id, String name, int age, String address){
        this.id = id;
        this.name = name;
        this.age = age;
        this.address = address;
    };

    public String getId(){
        return this.id;
    }
    public void setId(String id){
        this.id = id;
    };

    /**
     * 获取
     * @return name
     */
    public String getName() {
        return this.name;
    }

    /**
     * 设置
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取
     * @return age
     */
    public int getAge() {
        return this.age;
    }

    /**
     * 设置
     * @param age
     */
    public void setAge(int age) {
        this.age = age;
    }

    /**
     * 获取
     * @return address
     */
    public String getAddress() {
        return this.address;
    }

    /**
     * 设置
     * @param address
     */
    public void setAddress(String address) {
        this.address = address;
    }
}
