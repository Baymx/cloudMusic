<template>
  <div class="playList">
    <div class="detail">
      <h3>
        <span>歌单</span>{{ title }}</h3>
      <div class="content">
        <img :src="coverImgUrl">
        <div class="content-detail">
          <p class="tags">
            <b>标签:</b> {{ tag }}</p>
          <p class="description">
            <b>简介: </b>{{ description }}</p>
        </div>
      </div>
      <div class="play-btns">
        <p>
          <i>&#xe607;</i> 播放全部</p>
        <p>收藏</p>
      </div>
    </div>
    <div class="song-list">
      <ul>
        <li v-for="(item,index) in songList" :key="index">
          <img :src="item.al.picUrl">
          <div class="name">
            <span>{{ item.name}}</span>
            <span>{{item.ar[0].name}}</span>
          </div>
          <div class="play" @click="playMusic(item.id)">
            <span>&#xe60e;</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { setStorage, getStorage } from "@/utils/index";
import store from "@/store/index";
export default {
    data() {
        return {
            logs: [],
            title: "",
            coverImgUrl: "",
            tag: "",
            description: "",
            songList: []
        };
    },
    onLoad: function(options) {
        console.log(options);
        this.getSongList(options.id);
        // this.getSongList(2802435509);s
    },
    created() {},
    methods: {
        ...mapActions(["showLoading", "showToast", "songListDetail"]),
        getSongList(id) {
            this.songListDetail({ id: id })
                .then(res => {
                    if (res.code == 200) {
                        console.log(res);
                        this.title = res.playlist.name;
                        this.coverImgUrl = res.playlist.coverImgUrl;
                        this.tag = res.playlist.tags;
                        this.description = res.playlist.description;

                        this.songList = res.playlist.tracks;
                    } else {
                        this.showToast(res.msg ? res.msg : "error");
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        playMusic(id) {
            const url = "../play/main?id=" + id;
            wx.navigateTo({ url });
        }
    }
};
</script>
 <style lang="scss" scoped>
.playList {
    .detail {
        padding: 0 10px;
        background: #eeeeee;
        span {
            display: inline-block;
            background: #c20c0c;
            color: #ffffff;
            line-height: 24px;
            margin-right: 10px;
            border-radius: 5px;
        }
        h3 {
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
        .content {
            display: inline-flex;
            img {
                margin-top: 10px;
                display: inline-block;
                height: 150px;
                width: 150px;
                border-radius: 5px;
            }
            .content-detail {
                margin-top: 10px;
                margin-left: 10px;
                width: 200px;
                height: 150px;
                p {
                    font-size: 14px;
                    b {
                        display: inline;
                        font-weight: 700;
                        color: #000;
                    }
                }
                .tags {
                    color: #0c73c2;
                }
                .description {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 6;
                    -webkit-box-orient: vertical;
                }
            }
        }
        .play-btns {
            display: flex;
            height: 30px;
            line-height: 30px;
            p {
                width: 50%;
                font-size: 16px;
                text-align: center;
                i {
                    font-family: "iconfont";
                    display: inline;
                }
            }
            p:first-child {
                background-color: #c20c0c;
                color: #ffffff;
                border-bottom-left-radius: 5px;
                border-top-left-radius: 5px;
            }
            p:nth-child(2) {
                background-color: #cccccc;
                border-bottom-right-radius: 5px;
                border-top-right-radius: 5px;
            }
        }
    }
    .song-list {
        ul {
            li {
                width: 100%;
                padding: 10px;
                display: flex;
                align-items: center;
                img {
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    border-radius: 5px;
                    margin-right: 10px;
                }
                .name {
                    width: 250px;
                    font-size: 14px;
                    color: #333;
                    display: flex;
                    flex-direction: column;
                }
                .play {
                    span {
                        font-family: "iconfont";
                    }
                }
            }
        }
    }
}
</style>
