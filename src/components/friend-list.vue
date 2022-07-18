<script>
export default {
  name: 'FriendList',
  data() {
    return {
      selectedTab: 'tab-following',
      followingPage: 1,
      followerPage: 1,
    }
  },
}
</script>

<template>
  <div>
    <v-tabs v-model="selectedTab" centered color="primary">
      <v-tab href="#tab-following"> Following </v-tab>
      <v-tab href="#tab-followers"> Followers </v-tab>
    </v-tabs>

    <v-divider></v-divider>
    
    <v-tabs-items v-model="selectedTab">
      <v-tab-item value="tab-following">
        <v-list>
          <v-list-item
            v-for="n in 13"
            :key="n"
            color="primary"
            two-line
            class="my-2"
          >
            <v-list-item-icon class="ma-auto mr-4">
              <v-avatar color="primary" size="40" rounded="lg"
                ><v-img
                  src="https://avatars.dicebear.com/api/micah/friend.svg"
                ></v-img
              ></v-avatar>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-wrap">Michael</v-list-item-title>
              <v-list-item-subtitle> email@outlook.com </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-pagination
          v-model="followingPage"
          :length="2"
          color="primary"
        ></v-pagination>
      </v-tab-item>
      <v-tab-item value="tab-followers">
        <v-list>
          <v-list-item
            v-for="n in 13"
            :key="n"
            color="primary"
            two-line
            class="my-2"
          >
            <v-list-item-icon class="ma-auto mr-4">
              <v-avatar color="primary" size="40" rounded="lg"
                ><v-img
                  src="https://avatars.dicebear.com/api/micah/friend.svg"
                ></v-img
              ></v-avatar>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-wrap">Michael</v-list-item-title>
              <v-list-item-subtitle> email@outlook.com </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-pagination
          v-model="followerPage"
          :length="2"
          color="primary"
        ></v-pagination>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<style lang="scss" scoped></style>
