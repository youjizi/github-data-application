
<template>



<div class="content" >

  <div class="image-container">
    <img src="../assets/bg.png" alt="背景图片" />
    <p class="text-overlay">{{ data.name}}</p>
  </div>



  <div  class="userinfo">




    <el-descriptions
        class="margin-top"
        title="开发者"
        :column="3"
        :size="size"
        :style="blockMargin"

    >
      <template #extra>
        <el-link :href="'https://github.com/' + data.username">
          <el-button type="primary">find</el-button>
        </el-link>
      </template>

      <el-descriptions-item min-width="800px"  style="padding-bottom: 100px"  label="GitHub:"   span="3" >
        <el-row>

          <el-col :span="6">
            <el-statistic  :value="data.star_count" style="line-height: 16px">
                <template #title>Starts
                  <el-icon><Star size="6px"  ></Star> </el-icon>
                </template>
            </el-statistic>
          </el-col>

          <el-col :span="6">
            <el-statistic :value="data.commit_count">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  Commit<el-icon><Flag /></el-icon>
                </div>
              </template>
            </el-statistic>
          </el-col>

          <el-col :span="6">
            <el-statistic title="Talent Tank"  :value="parseFloat(data.talent_rank).toFixed(2)" >
              <template #suffix>
                %
              </template>
            </el-statistic>

          </el-col>

          <el-col :span="6">
            <el-statistic title="Last Uptime" :value="formattedLastEvaluated(data.last_updated)" >
              <template #suffix>

              </template>
            </el-statistic>
          </el-col>

        </el-row>
      </el-descriptions-item>



      <el-descriptions-item span="3" >

      </el-descriptions-item>


      <el-descriptions-item label="名称:"  min-width="50%">{{data.name}}</el-descriptions-item>

      <el-descriptions-item label="邮箱:" >{{data.email}}</el-descriptions-item>

      <el-descriptions-item label="现居地址:" >{{data.location}}</el-descriptions-item>




      <el-descriptions-item  span="3">

        <el-collapse >
          <el-collapse-item title="技能" name="4">
            <el-scrollbar>
              <el-tag type="primary"  v-for="item in data.skills"  class="scrollbar-demo-item">{{item}}</el-tag>
            </el-scrollbar>
          </el-collapse-item>

          <el-collapse-item title="项目" name="4">
            <el-scrollbar>
              <el-tag type="primary"  v-for="item in data.repositories"  class="scrollbar-demo-item">{{item}}</el-tag>
            </el-scrollbar>
          </el-collapse-item>

          <el-collapse-item title="专长" name="4">
            <el-scrollbar>
              <el-tag type="primary"  v-for="item in data.tech_evaluation.specialties"  class="scrollbar-demo-item">{{item}}</el-tag>
            </el-scrollbar>
          </el-collapse-item>
        </el-collapse>



      </el-descriptions-item>


      <el-descriptions-item  span="3">
        <h3>介绍</h3>
        {{data.tech_evaluation.ai_evaluation || "暂无详细介绍"}}
      </el-descriptions-item>
    </el-descriptions>


  </div>


</div>


</template>


<script  setup>
import {onMounted, ref} from 'vue'
import { useRoute } from 'vue-router';
import {getDevelopersInfo} from "@/request/request";

const route = useRoute();
const userId = ref('');
const data = ref({
  tech_evaluation: {},
  data_validation: {}

})
// const imgUrl = ref('../assets/bg.png');
const imgUrl = "../assets/bg.png"

onMounted(()=>{
  userId.value = route.params.id;
  console.log(userId.value);


  getDevelopersInfo(userId.value).then(res=>{
    data.value = res;
  })
  console.log(data);
})

const formattedLastEvaluated = (cur_date) => {

  if(cur_date === undefined){
    return "N/A"
  }
  const date =  new Date(cur_date);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;


} ;



</script>



<style scoped>

.content{
  display: flex;
  flex-direction: column;
  align-items: center;

}


.image-container {
  position: relative;
  width: 1000px;
  height: 450px; /* 占满整个视口高度 */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; /* 背景颜色，防止图片加载失败时有空白 */
  box-shadow: 0 4px 8px rgba(0, 0.3, 0.3, 0.3); /* 添加阴影效果 */
}

.image-container img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 图片覆盖整个容器，保持比例 */
  filter: brightness(40%); /* 调整图片亮度，增加层次感 */

}

/* 添加文字叠加样式 */
.text-overlay {
  position: absolute;
  color: white;
  font-size: 5em;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.06); /* 半透明黑色背景 */
  border-radius: 8px;
  max-width: 80%;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 添加一些渐变效果，增强视觉效果 */
.image-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5));
  z-index: 1;
}




.scrollbar-flex-content {
  display: flex;

}
.scrollbar-demo-item {
  //flex-shrink: 0;
  margin: 0 2px;
  text-align: center;
  border-radius: 4px;
  background: lightskyblue;
  color: #f6f8fa;
}

.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>