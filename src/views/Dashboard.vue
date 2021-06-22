<template>
  <div class="dashboard">
    <div class="dashboard-content">
      <div class="filter-row">
        <div class="welcome-message">Hello, Nathaniel!</div>
        <div class="filter-options">
          <span class="filter-title">filter by</span>
          <div class="filter">
            <select id="filter" class="filter-list" name="filter">
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="this-week">This Week</option>
              <option value="last-week">Last Week</option>
              <option selected value="today">Today</option>
            </select>
            <span class="filter-arrow"></span>
          </div>
        </div>
      </div>
      <div class="cards-section">
        <div class="all-service">
          <div class="card">
            <div class="card-descriptor">
              <span class="title-icon">
                <span class="icon ri-service-line violet"></span>
              </span>
              <span class="title">All Services</span>
            </div>
            <div class="card-data">{{ numberOfServices() }}</div>
            <div class="foot-note">4 not activated</div>
          </div>
        </div>
        <div class="upcoming-service">
          <div class="card">
            <div class="card-descriptor">
              <span class="title-icon">
                <span class="icon ri-service-line green"></span>
              </span>
              <span class="title">Upcoming Services</span>
            </div>
            <div class="card-data">1</div>
            <div class="foot-note">in 4hours time</div>
          </div>
        </div>
        <div class="finance">
          <div class="card">
            <div class="card-descriptor">
              <span class="title-icon">
                <span class="icon ri-service-line danger"></span>
              </span>
              <span class="title">Finance</span>
            </div>
            <div class="card-data">186 <small>GHC</small></div>
            <div class="foot-note">
              <span class="green-color">
                <span class="ri-arrow-up-s-fill"></span>
                2.4%
              </span>
              vs Last Month
            </div>
          </div>
        </div>
      </div>
      <div class="tutorials-and-links">
        <div v-if="tutorialState === 'true'" class="tutorials">
          <div class="slider">
            <div ref="slides" class="slides">
              <img alt="slider01" class="slide" src="@/assets/img/slider/slider-1.png">
              <img alt="slider02" class="slide" src="@/assets/img/slider/slider-2.png">
              <img alt="slider03" class="slide" src="@/assets/img/slider/slider-3.png">
              <img alt="slider04" class="slide" src="@/assets/img/slider/slider-4.png">
              <img alt="slider05" class="slide" src="@/assets/img/slider/slider-5.png">
            </div>
            <!--<img ref="currentImage" :src="currentTutorialImage" alt="slider" class="slide">-->
            <span v-if="slidePosition > -400" class="arrow right wave" @click="nextSlide">
              <span class="ri-arrow-right-fill"></span>
            </span>
            <span v-if="slidePosition < 0" class="arrow left wave" @click="prevSlide">
              <span class="ri-arrow-left-fill"></span>
            </span>
            <span class="close-tutorial" @click="closeTutorial">
              <span class="ri-close-fill"></span>
            </span>
          </div>
        </div>
        <div class="links">
          <div class="first-link-row">
            <div class="first-link">
              <div :class="['link-box', 'wave', tutorialState === 'false' ? 'flip-fade': '']"
                   data-tutorial="Create a Bill Payment">
                <span class="ri-money-dollar-circle-fill i"></span>
                <span class="link-text">Bill Mgt.</span>
              </div>
            </div>
            <div class="second-link">
              <div :class="['link-box', 'wave', tutorialState === 'false' ? 'flip-fade': '']"
                   data-tutorial="Manage your invoices here">
                <span class="ri-mail-fill i"></span>
                <span class="link-text">Invoice Mgt.</span>
              </div>
            </div>
          </div>
          <div class="second-link-row">
            <div class="first-link">
              <div :class="['link-box', 'wave', tutorialState === 'false' ? 'flip-fade': '']"
                   data-tutorial="Add more users with roles">
                <span class="ri-user-4-fill i"></span>
                <span class="link-text">User Mgt.</span>
              </div>
            </div>
            <div class="second-link">
              <div :class="['link-box', 'wave', 'new', tutorialState === 'false' ? 'flip-fade': '']"
                   data-tutorial="Create church services and more">
                <span class="ri-store-2-fill i"></span>
                <span class="link-text">Church Mgt.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dashboard-notification">
      <div class="reminder-header">
        <div class="toggle-notification wave">
          <span class="ri-menu-2-fill"></span>
        </div>
        <div class="date">Today, 19 July</div>
        <div class="notification-icon wave">
          <span class="ri-notification-2-fill"></span>
        </div>
        <div class="more-section wave">
          <span class="ri-more-2-fill"></span>
        </div>
      </div>
      <div class="reminder">
        <div class="reminder-item">
          <div class="time">9:00am</div>
          <div class="reminder-list">
            <div class="line"></div>
            <div class="reminder-list-item danger">
              <div class="reminder-text">
                <div class="reminder-title">YPG Service</div>
                <div class="reminder-note">9:00 - 9:30</div>
              </div>
              <div class="reminder-list-item-more-section wave">
                <span class="ri-more-2-fill icon"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="reminder-item">
          <div class="time">10:00am</div>
          <div class="reminder-list">
            <div class="line"></div>
            <div class="reminder-list-item danger">
              <div class="reminder-text">
                <div class="reminder-title">Prayer Meeting</div>
                <div class="reminder-note">10:00 - 10:45</div>
              </div>
              <div class="reminder-list-item-more-section wave">
                <span class="ri-more-2-fill icon"></span>
              </div>
            </div>
            <div class="reminder-list-item violet">
              <div class="reminder-text">
                <div class="reminder-title">Bible Studies</div>
                <div class="reminder-note">10:15 - 10:55</div>
              </div>
              <div class="reminder-list-item-more-section wave">
                <span class="ri-more-2-fill icon"></span>
              </div>
            </div>
          </div>
        </div>
        <!--        <div class="reminder-item">
          <div class="time">11:00am</div>
          <div class="reminder-list">
            <div class="line"></div>
            <div class="reminder-list-item green">
              <div class="reminder-text">
                <div class="reminder-title">Prayer Meeting 2</div>
                <div class="reminder-note">11:00 - 11:45</div>
              </div>
              <div class="reminder-list-item-more-section wave">
                <span class="ri-more-2-fill icon"></span>
              </div>
            </div>
            <div class="reminder-list-item violet">
              <div class="reminder-text">
                <div class="reminder-title">Bible Studies 2</div>
                <div class="reminder-note">10:15 - 10:55</div>
              </div>
              <div class="reminder-list-item-more-section wave">
                <span class="ri-more-2-fill icon"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="reminder-item">
          <div class="time">12:00pm</div>
          <div class="reminder-list">
            <div class="line"></div>
            <div class="reminder-list-item danger">
              <div class="reminder-text">
                <div class="reminder-title">YAF Service</div>
                <div class="reminder-note">12:00 - 12:30</div>
              </div>
              <div class="reminder-list-item-more-section wave">
                <span class="ri-more-2-fill icon"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="reminder-item">
          <div class="time">9:00am</div>
          <div class="reminder-list">
            <div class="line"></div>
            <div class="reminder-list-item danger">
              <div class="reminder-text">
                <div class="reminder-title">YPG Service</div>
                <div class="reminder-note">9:00 - 9:30</div>
              </div>
              <div class="reminder-list-item-more-section wave">
                <span class="ri-more-2-fill icon"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="reminder-item">
          <div class="time">10:00am</div>
          <div class="reminder-list">
            <div class="line"></div>
            <div class="reminder-list-item danger">
              <div class="reminder-text">
                <div class="reminder-title">Prayer Meeting</div>
                <div class="reminder-note">10:00 - 10:45</div>
              </div>
              <div class="reminder-list-item-more-section wave">
                <span class="ri-more-2-fill icon"></span>
              </div>
            </div>
            <div class="reminder-list-item violet">
              <div class="reminder-text">
                <div class="reminder-title">Bible Studies</div>
                <div class="reminder-note">10:15 - 10:55</div>
              </div>
              <div class="reminder-list-item-more-section wave">
                <span class="ri-more-2-fill icon"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="reminder-item">
          <div class="time">11:00am</div>
          <div class="reminder-list">
            <div class="line"></div>
            <div class="reminder-list-item green">
              <div class="reminder-text">
                <div class="reminder-title">Prayer Meeting 2</div>
                <div class="reminder-note">11:00 - 11:45</div>
              </div>
              <div class="reminder-list-item-more-section wave">
                <span class="ri-more-2-fill icon"></span>
              </div>
            </div>
            <div class="reminder-list-item violet">
              <div class="reminder-text">
                <div class="reminder-title">Bible Studies 2</div>
                <div class="reminder-note">10:15 - 10:55</div>
              </div>
              <div class="reminder-list-item-more-section wave">
                <span class="ri-more-2-fill icon"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="reminder-item">
          <div class="time">12:00pm</div>
          <div class="reminder-list">
            <div class="line"></div>
            <div class="reminder-list-item danger">
              <div class="reminder-text">
                <div class="reminder-title">YAF Service</div>
                <div class="reminder-note">12:00 - 12:30</div>
              </div>
              <div class="reminder-list-item-more-section wave">
                <span class="ri-more-2-fill icon"></span>
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import useService from '../services/church-management-services/useServicesFactory'

export default {
  name: "Dashboard",
  setup() {
    const {numberOfServices} = useService()
    const tutorialState = ref(window.localStorage['tutorial-key'])
    const slides = ref(null)
    const slidePosition = ref(0)
    const nextSlide = () => {
      if (slidePosition.value > -400) {
        slidePosition.value = slidePosition.value - 100
        slides.value.style.left = `${slidePosition.value}%`
        slides.value.style.transition = 'left 200ms cubic-bezier(0, 0, 0.07, 1.07)'
      }
    }
    const prevSlide = () => {
      if (slidePosition.value < 0) {
        slidePosition.value = slidePosition.value + 100
        slides.value.style.left = `${slidePosition.value}%`
        slides.value.style.transition = 'left 200ms cubic-bezier(0, 0, 0.07, 1.07)'
      }
    }
    const closeTutorial = () => {
      console.log(tutorialState.value)
      tutorialState.value = false
      window.localStorage['tutorial-key'] = tutorialState.value
    }

    return {
      slides,
      slidePosition,
      tutorialState,
      nextSlide,
      prevSlide,
      closeTutorial,
      numberOfServices
    }
  }
}

</script>

<style lang="scss" scoped>
@import "../assets/css/base-style";

.dashboard {
  display: grid;
  grid-template-columns: 70% auto;

  .dashboard-content {
    padding: 1rem;

    .filter-row {
      @include row;
      align-items: center;
      margin-bottom: 1rem;

      .welcome-message,
      .filter-options {
        flex: 1 1 50%;
      }

      .filter-options {
        text-align: end;
        width: max-content;
        height: max-content;
        @include row;
        align-items: center;

        .filter-title {
          color: #65656590;
          flex: 1 1;
          font-weight: bold;
        }

        .filter {
          width: max-content;
          height: max-content;
          position: relative;

          .filter-list {
            outline: none;
            border: 1px solid #80808015;
            border-radius: .5rem;

            min-width: 100px;

            padding: .5rem 1rem .5rem .5rem;
            margin-inline-start: 1rem;

            background-color: lighten(color(primary-lighter), 60%);
            appearance: none;

            &:focus-within, &:focus {
              outline: none;
            }
          }

          .filter-arrow {
            position: absolute;
            top: 0;
            right: 0;

            width: 20%;
            height: 100%;
            background-color: color(primary-lighter);
            color: white;
            border-radius: 0 .5rem .5rem 0;
            pointer-events: none;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 1px;

            &::after {
              content: '';
              border-inline: 4px solid transparent;
              border-top: 4px solid #808080;
            }

            &::before {
              content: '';
              border-inline: 4px solid transparent;
              border-bottom: 4px solid #808080;
            }
          }
        }
      }

      .welcome-message {
        font-size: 1.5rem;
        font-weight: bolder;
      }
    }

    .cards-section {
      width: 100%;
      height: max-content;

      @include row;
      flex-wrap: nowrap;

      .all-service,
      .upcoming-service,
      .finance {
        flex: 1 1 calc(100% / 3);
        padding: .5rem;
      }

      .card {
        border-radius: 1rem;
        border: 1px solid #80808020;

        padding: 1rem;

        .card-descriptor {
          @include row;
          padding: 0;
          align-items: center;

          .title-icon {
            flex: 1 1 30%;
            margin: 0;
            padding: 0;
            @include center;

            .icon {
              padding: .5rem;
              border-radius: .5rem;
              font-weight: bold;
            }
          }

          .title {
            @include cut-text;
            flex: 1 1 70%;
            padding-left: .25rem;
            font-weight: bold;
          }
        }

        .card-data {
          margin-block: .75rem;
          font-size: 3rem;
          font-weight: bolder;
          padding-inline: .5rem;
        }

        .foot-note {
          font-weight: bold;
          color: #65656590;
          padding-inline: .5rem;

          @include cut-text;
        }

      }

      @media screen and (max-width: $medium-screen) {
        flex-wrap: wrap;
      }
    }

    .tutorials-and-links {
      @include row;
      inline-size: 100%;
      block-size: max-content;
      align-items: center;

      .tutorials, .links {
        padding: .5rem;
      }

      .tutorials {
        flex: 1 1 200px;
      }

      .links {
        flex: 1 1 calc(100% / 2);
      }

      .tutorials {
        .slider {
          inline-size: 100%;
          block-size: 100%;
          border-radius: .5rem;
          overflow: hidden;

          position: relative;

          .arrow, .close-tutorial {
            position: absolute;
            border-radius: .5rem;
            padding: .5rem .75rem;

            color: white;
            font-weight: bold;

            @include center;

            &:hover {
              cursor: pointer;
            }
          }

          .close-tutorial, .right {
            right: 5%;
          }

          .arrow {
            bottom: 5%;
            background-color: color(primary);

            &:hover {
              background-color: lighten(color(primary), 10);
              transform: scale(1.05);
              transition: all 100ms ease-in;
            }

            &:not(:hover) {
              transform: scale(1);
              transition: all 100ms ease-in;
            }
          }

          .left {
            left: 5%;
          }

          .close-tutorial {
            top: 5%;
            background-color: #00000080;

            &:hover {
              background-color: #00000090;
            }
          }

          .slides {
            inline-size: 100%;
            block-size: 100%;
            position: relative;
            display: flex;

            .slide {
              inline-size: 100%;
              border-radius: .5rem;
            }
          }
        }
      }

      .links {
        .first-link-row, .second-link-row {
          @include row;
          flex-wrap: wrap;
          padding: .25rem;

          .first-link, .second-link {
            flex: 1 1 calc(100% / 2);
            padding: .25rem;
          }
        }

        .link-box {
          inline-size: 100%;

          @include center;
          flex-direction: column;
          padding: 3rem 0;
          color: color(lighter);
          background-color: lighten(color(primary), 10%);
          border-radius: .75rem;

          text-align: center;

          .i {
            font-size: 2rem !important;
          }

          .link-text {
            padding-block-start: 1rem;
            font-weight: bold;
          }

          &:hover {
            background-color: lighten(color(primary), 5%);
            cursor: pointer;
            transition: background-color 200ms ease-in;
          }
        }

        .new {
          background-color: color(primary);
        }
      }
    }

    @media screen and (max-width: $small-screen) {
      padding: 0;
    }
  }

  .dashboard-notification {
    padding: .5rem;

    .reminder-header {
      @include row;
      padding-inline: .5rem;
      border-block: 1px solid #80808010;

      align-items: center;

      .toggle-notification, .notification-icon, .more-section {
        flex: 0 0 30px;
        @include center;
        color: #656565;
        padding: .5rem;
        border-radius: .5rem;

        &:hover {
          cursor: pointer;
        }
      }

      .date {
        flex: 1 1;
        @include cut-text;
        font-weight: bold;
        padding-inline: .25rem;
      }

    }

    .reminder {
      max-height: 80vh;
      overflow: hidden scroll;
      padding: .5rem 0 0 0;

      .reminder-item {
        @include row;
        padding-inline: .5rem;

        .time {
          flex: 1 1 30%;
        }

        .reminder-list {
          flex: 1 1 70%;

          .line {
            margin: 1rem 0 .25rem 0;
            border-top: 1px solid #80808015;
          }

          .reminder-list-item {
            @include row;
            padding-inline: .5rem;
            padding-block: 1rem;
            border-radius: .5rem;
            margin-block-end: .5rem;

            .reminder-list-item-more-section {
              flex: 0 0 20px;
              border-radius: .5rem;
              @include center;
              .icon {
                padding: .5rem;
              }

              &:hover {
                cursor: pointer;
              }
            }
            .reminder-text {
              flex: 1 1;
              padding: 0 0 0 .5rem;

              .reminder-title {
                font-weight: bold;
                @include cut-text;
              }
              .reminder-note {
                font-size: 90%;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: $medium-screen) {
    grid-template-columns: 100%;

    .dashboard-notification {
      display: none;
    }
  }
}

.fade {
  opacity: 0;
  transition: opacity 150ms ease-in;
}
</style>