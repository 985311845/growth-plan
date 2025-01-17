import java.util.ArrayList;
import java.util.Scanner;

public class Studentsystem {
    public static void main(String[] args) {
        ArrayList<Student> list = new ArrayList<>();

        loop:while (true){
            System.out.println("------------------欢迎来到黑马学生管理系统------------------------");
            System.out.println("------------------牛马程序员，成就IT牛马------------------------");
            System.out.println("1.添加学生");
            System.out.println("2.删除学生");
            System.out.println("3.修改学生");
            System.out.println("4.查询学生");
            System.out.println("5.退出");
            System.out.println("请输入您的选择：");
            Scanner sc = new Scanner(System.in);
            String choose = sc.next();
            switch (choose){
                case "1": {
                    addStudent(list, sc);
                    break;
                }
                case "2": {
                    System.out.println("请输入删除学生的学生id");
                    String id = sc.next();
                    delStudent(list, id);
                    break;
                }
                case "3": {
                    System.out.println("请输入修改学生的学生id");
                    String id = sc.next();
                    updateStudent(list, id, sc);
                    break;
                }
                case "4": {
                    System.out.println("所有学生的学生信息如下");
                    getStudentList(list);
                    break;
                }
                case "5": {
                    System.out.println("退出");
                    break loop;
                }
                default: { System.out.println("没有这个选项"); break;}
            }
        }
    }
    //添加学生
    private static ArrayList<Student> addStudent(ArrayList<Student> list, Scanner sc){
        System.out.println("请输入学生Id");
        String id = sc.next();
        System.out.println("请输入学生姓名");
        String name = sc.next();
        System.out.println("请输入学生年龄");
        int age = sc.nextInt();
        System.out.println("请输入学生住址");
        String address = sc.next();

        Student student = new Student(id, name, age, address);
        list.add(student);
        return list;
    }
    //删除学生
    private static ArrayList<Student> delStudent(ArrayList<Student> list, String id){
        int index = getIndex(list, id);
        list.remove(index);
        return list;
    }
    //修改学生
    private static ArrayList<Student> updateStudent(ArrayList<Student> list, String id, Scanner sc){
        System.out.println("请输入学生Id");
        String newId = sc.next();
        System.out.println("请输入学生姓名");
        String name = sc.next();
        System.out.println("请输入学生年龄");
        int age = sc.nextInt();
        System.out.println("请输入学生住址");
        String address = sc.next();

        int index = getIndex(list, id);
        Student s = list.get(index);
        s.setId(newId);
        s.setName(name);
        s.setAge(age);
        s.setAddress(address);
        return list;
    }
    //查询
    private static ArrayList<Student> getStudentList(ArrayList<Student> list){
        System.out.println("ID-------姓名--------年龄--------地址");
        for (int i = 0; i < list.size(); i++) {
            System.out.println(list.get(i).getId() + "-------" + list.get(i).getName() + "--------" + list.get(i).getAge() + "--------" + list.get(i).getAddress());
        }
        System.out.print("------------------------------------");
        return list;
    }
    //查询学生对应的下标
    private static int getIndex(ArrayList<Student> list, String id){
        for (int i = 0; i < list.size(); i++) {
            if(id.equals(list.get(i).getId())){
                return i;
            }
        };
        return -1;
    }
}
