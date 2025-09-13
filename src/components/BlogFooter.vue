<template>
    <div class="Footer">
        <div class="running-days">本网站已运行 <span class="days-number">{{ runningDays }}</span> 天
            <p class="copyright">Copyright@zxbsdx</p>
            <a
                href="https://github.com/zxbsdx"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="https://img.shields.io/badge/GitHub-zxbsdx-181717?logo=github"
                    alt="GitHub"
                />
            </a>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      runningDays: 0, 
      siteCreationDate: '2025/05/05' 
    };
  },
  mounted() {
    this.calculateRunningDays();
  },
  methods: {
    calculateRunningDays() {
      const creationDate = new Date(this.siteCreationDate);
      const currentDate = new Date();
      const diffTime = currentDate - creationDate;
      this.runningDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }
  }
};
</script>

<style scoped>
    .Footer{
        width: 100%;  /* 依然是页面宽度 */
        background-color: #5352ed;
        
    }
    .running-days {
        font-size: 0.9rem;
        color: #666;
        background: #f5f5f5;
        padding: 1px 100px;
        border-radius: 12px;

    }
   
    .days-number {
        background: linear-gradient(45deg, #ff4757, #5352ed);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-weight: bold;
    }
</style>