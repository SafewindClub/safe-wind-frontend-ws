<template>
    <tiny-container pattern="classic">
      <template #header>
        <HeaderView />
      </template>
      <template #default class="main-content">
        <Banner
            title="海风学社"
            description="致力于推动科技创新和技术交流的学生组织"
        /><!-- 此处根据需要可以更改标题，背景，描述 -->
        <Activity
            :title="ActivityTitle"
            :activities="activities"
            @view-details="ActivityError"
        />
        <DepartIntroduction />
        <FooterView />
      </template>
    </tiny-container>
</template>

<script setup lang="ts">
import HeaderView from '@/components/HeaderView/HeaderView.vue'
import FooterView from '@/components/FooterView/FooterView.vue'
import Banner from "@/components/Banner.vue";
import Activity from "@/components/Activity.vue";
import DepartIntroduction from "@/components/DepartIntroduction.vue";
import { useHomeStore } from '@/stores/home'
import {TinyContainer} from "@opentiny/vue";
import activity from "@/components/Activity.vue";

const homeStore = useHomeStore()

//数据处理
const ActivityTitle="近期活动";
const activities=[
  {
    name: "AI技术研讨会",
    description: "探讨人工智能前沿发展与应用",
    date: "2024-03-15",
    imageUrl: "https://picsum.photos/400/300?random=1",
    url: "/",
  },
  {
    name: "机器人创新大赛",
    description: "展示最新机器人技术成果",
    date: "2024-03-20",
    imageUrl: "https://picsum.photos/400/300?random=2",
    url: "/",
  },
  {
    name: "创新创业论坛",
    description: "分享创业经验与技术创新",
    date: "2024-03-25",
    imageUrl: "https://picsum.photos/400/300?random=3",
  },
  {
    name: "黑客马拉松",
    description: "48小时极限编程挑战",
    date: "2024-04-10",
    imageUrl: "https://picsum.photos/400/300?random=4",
    url: "/",
  },
];
const ActivityError=(activity)=>{
  console.log(activity);
  alert("活动不存在,请进行检查");
}
</script>

<style scoped>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }
    .main-content {
      width: 100%;
    }
</style>