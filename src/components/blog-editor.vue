<script>
import IdentityEditor from "@/components/identity-editor.vue";
import { createBlog } from "@/api/blog.js";
import Blog from "@/models/Blog";

export default {
  name: "BlogEditor",
  components: {
    IdentityEditor,
  },
  props: {
    blog: {
      type: Blog,
      default: () => new Blog(),
    },
  },
  data() {
    return {
      showBlogEditor: false,
      savingBlog: false,
      postBlogToSquare: false,
      blogRules: [
        (v) => !v || v.trim().split(/\s+/).length <= 800 || "Max 800 words",
      ],
      visibility: [
        {
          text: "Public",
          description: "This blog is visible to all users",
          icon: "mdi-eye-outline",
          value: "public",
        },
        {
          text: "Follower",
          description: "This blog is visible to your followers",
          icon: "mdi-account-multiple-outline",
          value: "follower",
        },
        {
          text: "Private",
          description: "Only yourself can see this blog",
          icon: "mdi-lock-outline",
          value: "private",
        },
      ],
    };
  },
  mounted() {
    const lastBlog = this.$storage.get("last-blog");
    if (lastBlog) {
      Object.assign(this.blog, lastBlog);
    }
    window.addEventListener("beforeunload", () => {
      if (this.blog.content.trim()) {
        this.$storage.set("last-blog", this.blog);
      } else {
        this.$storage.remove("last-blog");
      }
    });
  },
  beforeRouteLeave() {
    if (this.blog && this.blog.content.trim()) {
      this.$storage.set("last-blog", this.blog);
    } else {
      this.$storage.remove("last-blog");
    }
  },
  methods: {
    show() {
      this.showBlogEditor = true;
    },
    hide() {
      this.showBlogEditor = false;
    },
    async createBlog(mode = "finished") {
      this.savingBlog = true;
      this.blog.authorId = this.$root.currentUser.objectId;
      this.blog.characterId = this.$root.currentCharacter.objectId;
      if (mode === "draft") {
        this.blog.status = "draft";
      }
      try {
        const blog = await createBlog(this.blog);
        console.log(blog);
        this.$snackbar.success("Blog was created successfully");
        this.$storage.remove("last-blog");
        Object.assign(this.blog, new Blog());
        this.hide();
        this.$emit("created");
      } catch (error) {
        console.log(error);
        this.$snackbar.error(error.rawMessage);
      }
      this.savingBlog = false;
    },
    discardBlog() {
      if (!this.blog.content.trim()) {
        this.hide();
        return;
      }
      this.$dialog({
        title: "Discard this blog ?",
        cancelButton: {
          text: "Nevermind",
          action: () => {},
        },
        confirmButton: {
          text: "Discard",
          action: () => {
            Object.assign(this.blog, new Blog());
            this.hide();
          },
        },
      });
    },
  },
};
</script>

<template>
  <div>
    <identity-editor ref="identity"></identity-editor>
    <v-dialog v-model="showBlogEditor" persistent closable max-width="700">
      <v-card tile>
        <v-card-title class="text-h5 secondary--text">
          Create Blog
          <v-spacer></v-spacer>
          <v-btn icon color="primary" @click="discardBlog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="d-flex align-center pt-8">
          <v-avatar
            color="primary"
            size="70"
            class="mr-6 clickable"
            @click="$refs['identity'].show()"
          >
            <img
              :src="`https://avatars.dicebear.com/api/micah/${$root.currentCharacter.objectId}.svg`"
              alt="John"
          /></v-avatar>
          <div style="width: 100%">
            <v-text-field
              v-model="blog.title"
              :rules="[(v) => !!v || 'Title is required']"
              hide-details="auto"
              label="Title"
              required
              outlined
              clearable
              class="mb-4"
              append-outer-icon="mdi-format-title"
            ></v-text-field>
            <v-textarea
              v-model="blog.content"
              append-outer-icon="mdi-image"
              label="write your blog here"
              rows="10"
              counter
              :rules="blogRules"
              clearable
              outlined
            >
              <template v-slot:counter="{}">
                {{ blog.content ? blog.content.trim().split(/\s+/).length : 0 }}
                / 800</template
              >
            </v-textarea>
          </div>
        </v-card-text>
        <div class="d-flex px-4">
          <v-combobox
            v-model="blog.tags"
            hide-selected
            label="Add some tags"
            multiple
            small-chips
            outlined
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Press <kbd>enter</kbd> to create a new tag
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attrs, item, parent, selected }">
              <v-chip
                v-bind="attrs"
                color="primary"
                :input-value="selected"
                label
              >
                <span class="pr-2">
                  {{ item }}
                </span>
                <v-icon small @click="parent.selectItem(item)">
                  $delete
                </v-icon>
              </v-chip>
            </template>
          </v-combobox>
          <v-spacer class="mx-16"></v-spacer>
          <!-- <v-select
            v-model="blog.visibility"
            :items="visibility"
            outlined
            disable-lookup
            hide-details
            label="Access"
          >
            <template v-slot:item="{ item, on, attrs }">
              <v-list-item link class="px-8" v-bind="attrs" v-on="on">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="item.description"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select> -->
          <v-checkbox
            v-model="postBlogToSquare"
            label="Post to T-square synchronously"
            required
          ></v-checkbox>
        </div>
        <v-divider class="mb-2 mt-4"></v-divider>
        <v-card-actions class="pb-4">
          <v-btn
            depressed
            large
            outlined
            color="primary"
            width="200"
            :loading="savingBlog"
            :disabled="savingBlog || !blog.content.trim()"
            @click="createBlog('draft')"
          >
            Save as draft
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            large
            color="primary"
            width="200"
            :loading="savingBlog"
            :disabled="savingBlog || !blog.content.trim()"
            @click="createBlog"
          >
            Publish
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
