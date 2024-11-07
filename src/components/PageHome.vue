

<template id="PageHome">

<div class="container">


  <!-- 搜索组件 -->
  <div v-if="developersData.content_show"  class="content-search">

      <el-input
          v-model="input_val"

          @input = "handleSelect"
          placeholder="搜索"
          class="input-with-select"
          clearable
          :suffix-icon="Search"
      >
        <template #prepend>
          <el-select
              v-model="domain_val"
              placeholder="领域"
              size="large"
              style="width: 110px"
              @change="handleSelect"
          >
            <el-option
                v-for="item in domain"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </template>

      </el-input>

  </div>


  <el-collapse>
    <el-collapse-item title="Nations" >
      <div>
        <el-checkbox-group v-model="selectedNations"   >
          <el-checkbox
              v-for="item in nations"
              :key="item.nation"
              :label="item.nation"
          >
            {{ item.nation }}
          </el-checkbox>
        </el-checkbox-group>
      </div>


      <template #title  style="width: 100%"  >
        Nations
      </template>
      <template #icon >
      <el-icon><Location /></el-icon>

      </template>

    </el-collapse-item>
  </el-collapse>




  <!--内容组件-->
  <div v-if="developersData.content_show" >
    <el-descriptions
        title=" "
        direction="vertical"
        border
        style="margin-top: 20px ;border-radius: 5%;"
        class="user-content"
        v-for="item in developersData.developers " :key="item.id" >
      <el-descriptions-item
          :rowspan="2"
          :width="140"
          label="Photo"
          align="center"
      >
        <el-image
            style="width: 100px; height: 100px"
            :src="item.avatar"
        />
      </el-descriptions-item>


        <el-descriptions-item label="开发者"  :width="120"   >

          <el-button type="text" @click="goToUserInfo(item.id)">  {{item.name}}</el-button>
        </el-descriptions-item>



      <el-descriptions-item label="国家"  :width="120" >
        <el-tag size="small" >{{item.nation || "隐藏"}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="starts">{{item.star_count}}</el-descriptions-item>
      <el-descriptions-item label="评估">
        <el-progress :percentage="parseFloat(item.talent_rank).toFixed(2)"
                     :stroke-width="10"
                     striped
                     striped-flow />
      </el-descriptions-item>
      <el-descriptions-item label="技术"  >
        <el-row class="w-150px mb-2"  style="width: 600px; ">
          <el-text class="custom-truncate"  style="color: #999999" truncated>{{ item.skills.toString() || "暂无" }}</el-text>
        </el-row>
      </el-descriptions-item>

    </el-descriptions>

  </div>

  <!--  异常组件 -->
  <div v-else  class="content-err">
    <img src="../assets/err.png" >
    <span>牛牛在吃草，稍后再来吧~</span>
  </div>

  <!--分页组件-->
  <div class="user-content-pagination">
    <el-pagination
        background
        layout="prev, pager, next"
        :page-size="developersData.page_size"
        :total="developersData.total"
        :current-page="developersData.page"
        @current-change="querySearchLimit"
        :hide-on-single-page="true"
    />
  </div>



</div>



</template>





<script setup>
import {getSearch, getNations} from "@/request/request";
import {onMounted, ref} from "vue";
import { Search } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'

// 路由
const router = useRouter()

const goToUserInfo = (userId) => {
  router.push({ name: 'UserInfo', params: { id: userId } });
};



// 渲染数据
const developersData = ref(
    {
      "developers": [],
      "page": 1,
      "page_size": 10,
      "total": 0,
      "content_show": false
    }

);
// 领域搜索参数
const domain_val = ref("")
// 搜索参数
const input_val = ref("")
// 地区搜索参数
const nations = ref([])
const selectedNations = ref([]);

const handleSelect = (item) => {
  console.log("选择：", item)
  developersData.value.page = 1
  querySearchLimit(1)
}




// 请求参数
const params = {
  "page": 1,            // 当前页码
  "page_size": 10,      // 每页数量
  "domain": "",         // 领域
  "sort_by": "talent_rank",   // 排序字段 talent_rank/star_count/commit_count
  "sort_asc": false,   //  默认降序
  "keyword": "",   //  搜索关键字
  "nations": []  //  国家多字段, 国家多字段目前出现问题，待修复
}

const domain = [
  {label: "全部", value: "全部领域"},
  {label: "后端开发", value: "backend"},
  {label: "前端开发", value: "frontend"},
  {label: "移动开发", value: "mobile"},
  {label: "人工智能", value: "ai"},
  {label: "运维开发", value: "devops"},
  {label: "数据库", value: "database"},
  {label: "安全", value: "security"},
  {label: "区块链", value: "blockchain"},
  {label: "游戏开发", value: "gamedev"},
  {label: "嵌入式", value: "embedded"},
  {label: "系统开发", value: "systems"}
]

// 分页查询
function querySearchLimit(newPage){

  // 1.分页处理
  params.page = newPage
  params.nations = selectedNations.value
  console.log("分页参数：", params)
  selectedNations

  // 领域处理
  if (domain_val.value !== ""  && domain_val.value !== domain[0].value) {
    console.log("当前：", domain_val.value)
    params.domain = domain_val.value
  }else {
    params.domain = ""
  }

  // 带参处理
  let  requestParams = buildQueryParams(params)
  // 地区处理
  if(params.nations !== null && params.nations.length > 0){
    requestParams += "&nations=" + params.nations.join(",")
  }
  // 搜索key处理
  if(input_val.value !== ""){
    requestParams += "&keyword=" + input_val.value
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  querySearchAsync(requestParams);
  scrollToTop();
  const handleKeydown = (event) => {
    if (event.key === 'Enter') {
      querySearchLimit(developersData.value.page)
    }
  };

}





// 多参拼接
function buildQueryParams(params) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== '' && value !== "") {
      console.log(key, value)
      if (!Array.isArray(value)) {
        searchParams.append(key, value);
      }
    }
  }

  return searchParams.toString();
}

// 请求
const  querySearchAsync = async (requestParams) => {
  try {
    const res = await getSearch(requestParams);
    developersData.value = res.valueOf();
    developersData.value.content_show = true
  } catch (e) {
    developersData.value.content_show = false
    console.log(e);
  }
}


// 滚动到顶部
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

querySearchLimit(1)
domain_val.value = domain[0].value


getNations().then(res => {
  nations.value = res.data
})

</script>
.

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.content-search{

  margin-top: 20px;
  width: 625px;


}

/deep/ .el-collapse-item__header{
  color: #999999;
}


.user-content {


  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */


}

.content-err{

  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img{
    width: 300px;
    height: 300px;
  }
  span {
    color: #999999;
  }

}
.user-content-pagination{
  margin-top: 20px;
}


</style>
