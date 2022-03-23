<template>
  <div class="container mb-10">
    <div class="main">
      <div class="image-banner">
        <!-- <img src="img/banner.jpg" alt="image banner" /> -->
      </div>
      <div class="flex-center">
        <div class="image-profile shadow">
          <!-- <img src="img/banner.jpg" alt="image banner" /> -->
        </div>
      </div>
      <div class="main-wrapper shadow">
        <p v-if="user.bio" class="bio text-center">Bio : {{ user.bio }}</p>
        <p v-else class="bio text-center">don't have bio</p>

        <div class="main-info">
          <div name="name">
            <div>Name</div>
            <p>
              {{ user.name }}
            </p>
          </div>
          <div name="gender">
            <div>Gender</div>
            <p v-if="user.gender">
              {{ user.gender }}
            </p>
            <p v-else>Other</p>
          </div>
          <div v-if="user.age" name="age">
            <div>Age</div>
            <p>{{ user.age }} Years</p>
          </div>
          <div v-if="user.age" name="birthday">
            <div>Birthday</div>
            <p>
              {{ user.birthday }}
            </p>
          </div>
          <div v-if="user.age" name="birthday">
            <div>Hometown</div>
            <p>
              {{ user.hometown }}
            </p>
          </div>
          <div v-if="user.age" name="birthday">
            <div>Zodiac</div>
            <p>
              {{ user.zodiac }}
            </p>
          </div>
        </div>
      </div>

      <div class="main-wrapper shadow">
        <h3>Career</h3>
        <div v-if="company_name"></div>
        <div v-else>
          <div class="w-full flex-center">
            <img
              v-for="(career, index) in careers"
              :key="index + 1"
              :src="`img/career/${career}.svg`"
              alt="image career"
              class="image-career"
            />
          </div>
        </div>
      </div>

      <div class="main-wrapper shadow mb-10">
        <h3>Education</h3>
        <div v-if="company_name"></div>
        <div v-else>
          <div class="w-full flex-center">
            <img
              v-for="(career, index) in careers"
              :key="index + 1"
              :src="`img/education/${career}.svg`"
              alt="image career"
              class="image-career"
            />
          </div>
        </div>
      </div>
      <div class="h-10"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      user: {},
      company_name: null,
      careers: ['1', '2', '3', '4'],
    }
  },
  head() {
    return {
      title: `Homepage - Boilerplate Nuxt Javascript`,
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      this.$overlay(true)
      this.user = await this.$store.dispatch('profile/user')
      this.company_name = this.user.career.company_name
      this.$overlay(false)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  height: 90vh;
  display: flex;
  justify-content: center;
}

.image-banner {
  width: 460px;
  height: 160px;
  border-radius: 10px;
  background: #252525;

  img {
    width: 460px;
    height: 160px;
    object-fit: cover;
    border-radius: 10px;
  }
}

.image-profile {
  margin-top: -3.2rem;
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background: #89be05;
}

.main-wrapper {
  background: white;
  width: 460px;
  padding: 15px;
  border-radius: 10px;
  margin-top: 1.5rem;

  .bio {
    font-style: italic;
  }

  h3 {
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.6rem;
  }
}

.main-info {
  margin-top: 10px;
  padding: 0.6rem;
  p {
    font-weight: 800;
    font-size: 1.1rem;
  }
}
.image-career {
  width: 10%;
  margin: 0 1rem;
}
</style>
