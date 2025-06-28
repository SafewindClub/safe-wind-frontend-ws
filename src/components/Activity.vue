<template>
  <section class="container">
    <h2>{{ title }}</h2>
    <div class="scroll-container">
      <div class="activity-list">
        <div v-for="(activity, index) in activities" :key="index" class="activity-item">
          <img :src="activity.imageUrl" :alt="activity.name">
          <h3>{{ activity.name }}</h3>
          <p>{{ activity.description }}</p>
          <p>{{ activity.date }}</p>
          <a
              href="#"
              @click.prevent="ActivityError(activity)"
              class="details-link"
          >
            查看详情
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Activity",
  props: {
    title: {
      type: String,
      default: "近期活动",
    },
    activities: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ActivityError(activity) {
      if (activity.url) {
        this.$router.push(activity.url);
      } else {
        this.$emit("view-details", activity);
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 95%;
  margin: 40px auto;
}
h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
}
.scroll-container {
  overflow-x: auto;
  white-space: nowrap;
}
.activity-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
.activity-item {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  text-align: center;
}
.activity-item img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
.activity-item h3 {
  margin: 10px 0;
}
.activity-item p {
  margin: 5px 0;
  color: #666;
}
.details-link {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  background: #f0f0f0;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
  transition: background 0.3s;
}
.details-link:hover {
  background: #e0e0e0;
}
</style>