var Table=Vue.component('Table',{
    props:['Tablehead'],
    template:`
        <table>
            <tr>
               <th v-for="item in Tablehead">{{item}}</th>
               <th>操作</th>
            </tr>
            <tr v-for="item in datas">
                 <td>{{item.name}}</td>
                 <td>{{item.age}}</td>
                 <td>{{item.sex}}</td>
                 <td>
                    <a @click="del(item.id)" style="cursor: pointer;">删除</a>
                    <a :href="'#/edit/'+item.id">编辑</a>
                 </td>
            </tr>
        </table>
    `,
    data(){
        return{
            datas:[

            ]
        }
    },
    methods:{
        del(id){
            var that=this;
            fetch('/del/'+id).then(function (e) {
                return e.text()
            }).then(function (e) {
                if(e =='ok'){
                    that.datas=that.datas.filter(function (item) {
                        if(item.id!=id){
                            return item
                        }
                    })
                    alert('删除成功')
                }
            })

        }
    },
    mounted(){
        var that=this;
        fetch('/fetch').then(function (e) {
            return e.json();
        }).then(function (e) {
            that.datas=e;
        })
    }
})

var Index=Vue.component('Index',{
    template:`
        <div style="width:100%;">
            <Table :Tablehead="['姓名','年龄','性别']" class="custom-table"></Table>
        </div>
    `
})
var Add=Vue.component('Add',{
    template:`
            <form>
              <div class="form-group">
                <label for="name">姓名</label>
                <input type="text" class="form-control" id="name" name="name" placeholder="姓名" v-model="name">
              </div>
              <div class="form-group">
                <label for="age">年龄</label>
                <input type="text" class="form-control" id="age" name="age" placeholder="年龄" v-model="age">
              </div>
              <div class="form-group">
                <label for="sex">性别</label>
                <input type="text" class="form-control" id="sex" name="sex" placeholder="性别" v-model="sex">
              </div>
              <button type="submit" class="btn btn-default" @click="submit()">Submit</button>
            </form>
     `,
    data(){
        return {
            name:'',
            age:'',
            sex:''
        }
    },
    methods:{
        submit(){
            var that=this;
            var datastring='name='+that.name+'&age='+that.age+'&sex='+that.sex;
            fetch('/addcon?'+datastring).then(function (e) {
                return e.text()
            }).then((e)=>{
                if(e == 'ok'){
                    alert('添加成功')
                    that.name='';
                    that.age='';
                    that.sex='';
                }else{
                    alert('添加失败')
                }
            })
        }
    }
})
var Edit=Vue.component('Edit',{
    template:`
            <form>
              <div class="form-group">
                <label for="name">姓名</label>
                <input type="text" class="form-control" id="name" placeholder="姓名" v-model="name">
              </div>
              <div class="form-group">
                <label for="age">年龄</label>
                <input type="text" class="form-control" id="age" placeholder="年龄" v-model="age">
              </div>
              <div class="form-group">
                <label for="sex">性别</label>
                <input type="text" class="form-control" id="sex" placeholder="性别" v-model="sex">
              </div>
              <button type="submit" class="btn btn-default" @click="update">Submit</button>
            </form>
     `,
    data(){
        return {
            name:'',
            age:'',
            sex:''
        }
    },
    methods:{
        update(){
            var that=this;
            var datastring='name='+that.name+'&age='+that.age+'&sex='+that.sex+'&id='+that.$route.params.id;
            fetch('/editcon?'+datastring).then(function (e) {
                return e.text()
            }).then(function (e) {
                if(e=='ok'){
                    alert('修改成功')
                }else{
                    alert('修改失败')
                }
            })
        }
    },
    mounted(){
        var that=this;
        fetch('/edit/'+that.$route.params.id).then(function (e) {
            return e.json();
        }).then(function (e) {
            that.name=e[0].name;
            that.age=e[0].age;
            that.sex=e[0].sex;
        })
    }
})