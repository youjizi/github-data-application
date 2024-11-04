

<template id="PageHome">

  <el-autocomplete
      v-model="state"
      :fetch-suggestions="1"
      placeholder="Please input"
      @select="handleSelect"
  />


<div>
  <el-descriptions title="  " border v-for="item in developersData.developers " :key="item.id" >
    <el-descriptions-item
        :rowspan="1"
        :width="100"
        label="头像"
        align="center"
    >
      <el-image
          style="width: 100px; height: 100px"
          :src="item.avatar"
      />
    </el-descriptions-item>
    <el-descriptions-item label="开发者">{{item.name}}</el-descriptions-item>
    <el-descriptions-item label="starts">{{item.star_count}}</el-descriptions-item>
    <el-descriptions-item label="技术能力">
      <el-progress :percentage="parseFloat(item.talent_rank).toFixed(2)"
                   :stroke-width="10"
                   striped
                   striped-flow />
    </el-descriptions-item>

    <el-descriptions-item label="国家"  >
      <el-tag size="small" >{{item.nation }}</el-tag>
    </el-descriptions-item>

  </el-descriptions>



</div>


<div>
  <el-pagination
      background
      layout="prev, pager, next"
      :page-size="developersData.page_size"
      :total="developersData.total"
      @current-change="querySearchLimit"
  />
</div>



</template>





<script setup>
import {getSearch} from "@/request/request";
import {onMounted, ref} from "vue";

// 渲染数据
const developersData = ref(
    {
      "developers": [],
      "page": 1,
      "page_size": 0,
      "total": 0
    }

);

// 请求参数
let params = {
  "page": 1,            // 当前页码
  "page_size": 10,      // 每页数量
  "domain": "",         // 领域
  "sort_by": "talent_rank",   // 排序字段 talent_rank/star_count/commit_count
  "sort_asc": false,   //  默认降序



}

const domain = ref([
  {"key": "backend", "value": "后端开发"},
  {"key": "frontend", "value": "前端开发"},
  {"key": "mobile", "value": "移动开发"},
  {"key": "ai", "value": "人工智能"},
  {"key": "devops", "value": "运维开发"},
  {"key": "database", "value": "数据库"},
  {"key": "security", "value": "安全"},
  {"key": "blockchain", "value": "区块链"},
  {"key": "gamedev", "value": "游戏开发"},
  {"key": "embedded", "value": "嵌入式"},
  {"key": "systems", "value": "系统开发"}
])




// 分页查询
function querySearchLimit(newPage){
  params.page = newPage
  console.log(params.page)
  const  requestParams = buildQueryParams(params)
  querySearchAsync(requestParams)

}





// 多参拼接
function buildQueryParams(params) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== '') {
      if (Array.isArray(value)) {
        searchParams.append(key, value.join(','));
      } else {
        searchParams.append(key, value);
      }
    }
  }

  return searchParams.toString();
}

// 请求
const  querySearchAsync = async () => {
  try {
    const res = await getSearch(params);
    developersData.value = res;
    console.log(res)
  } catch (e) {
    console.log(e);
  }
}

querySearchAsync()


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
