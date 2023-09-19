# 关于路由

### 动态路由

1. 添加动态路由的时候，权限字符必须设置在form页面，而不是to页面（菜单管理form页面）

### 静态路由

1. 在路由文件里面添加静态路由列表

   ``` javascript
   // router文件夹添加
    export const publicRoutes = [
     {
       path: '/knowledgeZone/filelist-model',
       component: Layout,
       hidden: true,
       permissions: ['knowledgeZone:filelist:detail'],
       meta: {
         affix: false
       },
       children: [
         {
           path: 'modelDetail',
           component: (resolve) =>require(['@/views/knowledgeZone/filelist/detail/index.vue'], resolve),
           name: 'ModelDetail',
           meta: { title: '模块详情', activeMenu: '/knowledgeZone/filelist', affix: false },
         }
       ]
     },
   ]
   ```

2. 在store/modules/permission.js中使用router.addRoutes添加路由

   ```javascript
   actions: {
       // 生成路由
       GenerateRoutes({ commit }) {
         return new Promise(resolve => {
           // 向后端请求路由数据
           getRouters().then(res => {
             const sdata = JSON.parse(JSON.stringify(res.data))
             const rdata = JSON.parse(JSON.stringify(res.data))
             const sidebarRoutes = filterAsyncRouter(sdata)
             const rewriteRoutes = filterAsyncRouter(rdata, false, true)
             const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
             rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
             router.addRoutes(asyncRoutes);
             router.addRoutes(publicRoutes);
             commit('SET_ROUTES', rewriteRoutes)
             commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
             commit('SET_DEFAULT_ROUTES', sidebarRoutes)
             commit('SET_TOPBAR_ROUTES', sidebarRoutes)
             resolve(rewriteRoutes)
           })
         })
       }
     }
   ```


# 关于项目启动

![image-20230517095603429](C:\Users\hufeng\AppData\Roaming\Typora\typora-user-images\image-20230517095603429.png)

一般是接口请求超时，或者服务器代理错误（vue.config.js）

