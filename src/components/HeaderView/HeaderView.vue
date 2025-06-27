<template>
    <header>
      <div class="nav-container">
        <div class="logo">海风学社</div>
        <nav>
          <ul>
            <li><a href="#">首页</a></li>
            <li><a href="#">活动中心</a></li>
            <li><a href="#">新闻动态</a></li>
            <li><a href="#">海风墙</a></li>
            <li><a href="#">部门介绍</a></li>
            <li><a href="#">加入我们</a></li>
          </ul>
        </nav>
      </div>
    </header>
</template>

<script setup>


</script>

<style scoped>
    header {
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #eee;
    }

    .nav-container {
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
    }

    .logo {
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }

    nav ul {
      display: flex;
      list-style: none;
    }

    nav ul li {
      margin-left: 20px;
    }

    nav ul li a {
      text-decoration: none;
      color: #333;
      font-size: 14px;
    }


</style>