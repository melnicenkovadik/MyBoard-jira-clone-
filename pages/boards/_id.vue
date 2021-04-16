<template>
  <div class='d-flex flex-column board '
       :style="board.color
        ? `background-color:${board.color}`
        : ''
    ">
    <v-container fluid class='board-topbar'>
      <v-row no-gutters>
        <v-col cols='1' class='flex-grow-0 flex-shrink-0'>
          <v-icon @click='drawer = true'>mdi-menu</v-icon>
        </v-col>
        <v-row no-gutters class='d-flex align-center justify-content-between'>
          <v-col
            cols='10'
            class='logo col-sm-7'
          >
            <nuxt-link to='/'>
              <img class='logo-main ' src='~/assets/icons/logo/Logo.svg' alt='Ze' />
            </nuxt-link>
            <img src='~/assets/icons/logo/Ze.svg' alt='Ze' />
            <img src='~/assets/icons/logo/Board-125x31.svg' alt='Board' />
          </v-col>
          <v-col
            class='col-sm-5'
            cols='1'
          >
            <v-btn
              class='ma-2'
              outlined
              color='primary '
              v-if='!isMobile'
              @click='dialog = true'
            >
              Create column
            </v-btn>
            <v-btn
              class='white--text'
              color='#FC1370'
              :disabled='!board.lists'
              @click='
            dialogCard = true
            listId = board.lists[0].id
          '
            >
              <font-awesome-icon
                far
                icon='plus'
                v-if='isMobile' />
              <span v-else>Add card</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
    <v-container class='content'>
      <div class='d-block '>
        <v-navigation-drawer
          v-model='drawer'
          fixed
          left
          class='d-block px-3 py-3'
        >
          <v-container fluid class='board-topbar'>
            <v-row no-gutters align='center' justify='space-between'>
              <v-icon @click='drawer = false'>mdi-close</v-icon>

              <v-row no-gutters align='center' justify='end'>
                <p class='board-user'>
                  Signed in as<br />
                  {{ $nuxt.$fire.auth.currentUser.email }}
                </p>
              </v-row>
            </v-row>
          </v-container>
          <v-container class='d-block menu-items'>
            <div class='d-flex flex-column'>
              <div class='d-flex'>
                <br />
              </div>
              <div class='d-flex mt-10'>
                <nuxt-link to='/'>
                  <v-icon>mdi-view-dashboard-variant-outline
                  </v-icon>
                  &nbsp;&nbsp;<b>My Boards</b>
                </nuxt-link>
              </div>
              <div class='d-flex'>
                <nuxt-link to='/auth/signout'>
                  <v-icon>mdi-exit-to-app</v-icon>&nbsp;&nbsp;<b>Sign out</b>
                </nuxt-link>
              </div>
            </div>
            <div class='d-flex'>
              <v-btn @click.native='deleteBoard()'>
                <v-icon>mdi-delete-outline</v-icon>
                &nbsp;&nbsp;<b>Delete board</b>
              </v-btn>
            </div>
          </v-container>
        </v-navigation-drawer>
      </div>
      <div class='d-flex flex-column flex-sm-row scroll-board  '>
        <v-expansion-panels v-if='isMobile' accordion>
          <v-expansion-panel
            v-for='list in board.lists'
            v-bind:key='list.id'
            @drop='drop($event, list.id)'
            @dragover='allowDrop($event)'
            class='d-flex flex-column   list'>
            <v-expansion-panel-header
              class=' list-header d-flex flex-row  '>
              <h4 style='width: 80%'>{{ list.title }} - {{ list.cards.length }}</h4>
              <span class='mr-auto'>
                <v-icon small @click='deleteList(list.id)'>mdi-delete-outline</v-icon>
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content class='innerExPan'
            >
              <v-card
                v-for='(card,i) in list.cards'
                :draggable='true'
                @dragover.prevent
                @dragstart='drag($event, card)'
                class=' card'
                @click='editCard(card)'
                v-bind:key='card.id'
              >
                <v-row class='d-sm-flex align-center justify-center'>
                  <v-col class='pa-1' cols='2'>
                    <div>
                      <v-card-text v-if='card.author'>
                        <span class='card-author'>
                       <v-avatar
                         color='grey lighten-2'
                         size='48'
                       ></v-avatar>
                </span>
                      </v-card-text>
                    </div>
                  </v-col>
                  <v-col cols='8'>
                    <v-row>
                      <v-card-text v-if='card.title'><span class='card-title'>{{ card.title }}</span></v-card-text>

                    </v-row>
                    <v-row>
                      <v-card-text>
                        <span class='card-number'
                        ><strike
                          v-if="list.title.trim().toLowerCase() ===  'done'">
                        BW-{{ (i + 1) * list.cards.length }}
                      </strike>
                     <span v-else>BW-{{ (i + 1) * list.cards.length }}</span>
                      </span>
                      </v-card-text>
                    </v-row>
                  </v-col>
                  <v-col cols='2'>
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-col>
                </v-row>

              </v-card>

            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <div
          v-else
          v-for='(list,index) in board.lists'
          @drop='drop($event, list.id)'
          @dragover='allowDrop($event)'
          class='d-flex flex-column  mr-6 list'
          v-bind:key='list.id'
        >
          <div class=' list-header d-flex flex-row justify-space-between'>
            <h4>{{ list.title }} - {{ list.cards.length }}</h4>
            <v-icon small @click='deleteList(list.id)'>mdi-delete-outline</v-icon>
          </div>

          <!--display cards-->
          <v-card
            v-for='(card,i) in list.cards'
            :draggable='true'
            @dragover.prevent
            @dragstart='drag($event, card)'
            class=' card'
            @click='editCard(card)'
            v-bind:key='i'
          >
            <v-card-text v-if='card.title'>
              <div class='card-title'>{{ card.title }}</div>
            </v-card-text>
            <v-card-text v-if='card.until'>
              <div class='card-until'>Until {{ card.until }}</div>
            </v-card-text>
            <v-card-text v-if='card.estimat'>
              <div class='card-estimat'> {{ card.estimat }}</div>
            </v-card-text>
            <v-card-text v-if='card.project'>
              <div
                :style="{'background-color':card.color,'color':card.color.substring(0, 15) + '1)'  }"
                class='card-project'>
                <span>  Project {{ card.project }}</span>
              </div>
            </v-card-text>
            <div class='card-bottom'>
              <div>
                <v-card-text v-if=''><span class='card-number'
                ><strike v-if="list.title.trim().toLowerCase() ===  'done'">
                BW-{{
                    (i + 1) * list.cards.length
                  }}</strike>
                <span v-else>BW-{{ (i + 1) * list.cards.length }}</span></span></v-card-text>
              </div>
              <div>
                <v-card-text v-if='card.author'><span class='card-author'>
                 <v-avatar
                   color='grey lighten-2'
                   size='48'
                 ></v-avatar>
                </span></v-card-text>
              </div>
            </div>
          </v-card>
        </div>
        <v-col
          cols='12'
          v-if='isMobile'
          style='min-width: 300px; max-width:100%;'
          class='d-flex align-center justify-center  '
        >
          <v-btn depressed @click='dialog = true' class='create-list'>
            Create column
          </v-btn>
        </v-col>
        <v-dialog v-model='dialogCard' persistent max-width='600px'>
          <v-card elevation='0'>
            <v-card-title>
              <span class='headline'>Сreate task</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols='12'>
                    <v-text-field
                      label='Name'
                      clearable
                      v-model='card.title'
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols='12'>
                    <v-textarea
                      label='Description'
                      v-model='card.description'
                      required
                      clearable

                    ></v-textarea>
                  </v-col>
                  <v-col cols='12'>
                    <v-text-field
                      label='Project'
                      clearable
                      v-model='card.project'
                      required
                    ></v-text-field>
                  </v-col>
                  <v-row cols='12'>

                    <v-col
                      cols='12'
                      lg='6'
                    >
                      <v-menu
                        v-model='menu2'
                        :close-on-content-click='false'
                        transition='scale-transition'
                        offset-y
                        max-width='290px'
                        min-width='auto'
                      >
                        <template v-slot:activator='{ on, attrs }'>
                          <v-text-field
                            v-model='computedDateFormatted'
                            label='Until'
                            persistent-hint
                            prepend-icon='mdi-calendar'
                            readonly
                            v-bind='attrs'
                            v-on='on'
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model='date'
                          no-title
                          @input='menu2 = false'
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols='6'>
                      <v-text-field
                        label='Estimation time'
                        v-model='card.estimat'
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-col cols='6'>
                    <v-text-field
                      label='Author'
                      v-model='card.author'
                      required
                    ></v-text-field>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class='white--text'
                     color='#FC1370' @click='dialogCard = false'>
                Close
              </v-btn>
              <v-btn color='primary' outlined text @click='createCard()'>
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div class='d-flex flex-row'>

          <v-dialog v-model='dialog' persistent max-width='600px'>
            <v-card elevation='0'>
              <v-card-title>
                <h2 class='headline font-weight-bold '>Create column</h2>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols='12'>
                      <v-text-field
                        label='NEW COLUMN TITLE'
                        v-model='list.title'
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class='white--text'
                       color='#FC1370' @click='createList()'>
                  Add
                </v-btn>
                <v-btn outlined color='primary' text @click='dialog = false'>
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <v-dialog v-model='dialogEditCard' persistent max-width='982px'>
          <v-card elevation='0'>
            <v-container>
              <v-row>
                <v-col>
                  <v-card-text v-if='currentCard.project' >
                  <span  class='font-weight-bold'>
                      BW- {{ currentCard.project }}
                  </span>
                  </v-card-text>

                </v-col>
                <v-col cols='1'><span style='cursor: pointer' @click='dialogEditCard = false'><v-icon>mdi-close</v-icon></span></v-col>
              </v-row>
              <v-row class='flex  justify-space-between '>
                <v-col cols='12' sm='6'>
                  <v-text-field
                    v-model='currentCard.title'
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols='12' sm='3'>
                  <v-row style='max-width:150px'>
                    <v-col cols='10'>
                      <v-card-text v-if='currentCard.author'><span class='card-author'> {{
                          currentCard.author
                        }}</span>
                      </v-card-text>
                    </v-col>
                    <v-col cols='1'>
                      <div>
                        <span class='card-author'>
                        <v-avatar
                          color='grey lighten-2'
                          size='48'
                        ></v-avatar>
                </span>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols='12'>
                  <div class='text--secondary '>Description</div>
                  <span v-if='currentCard.description'>
                     <v-textarea
                       v-model='currentCard.description'
                       required
                     ></v-textarea>
                  </span>
                </v-col>
                <v-row cols='12' class='mt-5 text--secondary'>
                  <v-col>
                    <v-card-text v-if='currentCard.until'><span class='card-until'>   Until {{ currentCard.until
                      }}</span>
                    </v-card-text>
                  </v-col>
                  <v-col>
                    <span v-if='currentCard.estimat'>
                      <v-text-field
                        style='width:200px'
                        v-model='currentCard.estimat'
                        required
                      >
                        <template v-slot:prepend>
                            <span class='text--secondary'>
                            Estimation time
                            </span>
                        </template>
                      </v-text-field>
                    </span>
                  </v-col>
                  <v-col>
                    <v-card-text v-if='currentCard.estimat'><span class='card-estimat'>
                          Created {{ currentCard.dateCreated  | formatDate }}</span>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color='red darken-1' text @click='deleteCard()'>
                Delete
              </v-btn>
              <v-btn color='blue darken-1' text @click='updateCard()'>
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  layout: 'board',
  data(vm) {
    return {
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu2: false,
      isMobile: false,
      listId: '',
      list: {
        title: ''
      },
      card: {
        title: '',
        description: '',
        until: '',
        estimat: '',
        author: '',
        project: ''
      },
      currentCard: {},
      cardDraggedId: '',
      cardDraggedListId: '',
      dialog: false,
      dialogCard: false,
      dialogEditCard: false,
      drawer: false
    }
  },
  beforeDestroy() {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  mounted() {
    this.onResize()

    window.addEventListener('resize', this.onResize, { passive: true })
  },
  async asyncData({ params }) {
    //lets get our board data before page load, and then after that await changes
    let boardRef = $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
      .collection('boards')
      .doc(params.id)
    let boardData = {}
    await boardRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          boardData = doc.data()
          boardData.id = params.id
        }
      })
      .catch(function(error) {
      })
    return { board: boardData }
  },
  created() {
    let that = this
    let tempId = this.board.id
    let boardRef = $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
      .collection('boards')
      .doc(tempId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          that.board = doc.data() || []
          that.board.id = tempId
        }
      })
  },
  computed: {
    computedDateFormatted() {
      this.card.until = this.formatDate(this.date)
      return this.formatDate(this.date)
    }

  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    onResize() {
      this.isMobile = window.innerWidth < 600
    },
    async createList() {
      let that = this
      that.dialog = false
      if (that.list.title != '') {
        //add to firebase
        //Let's give our list a created date.
        that.list.id = uuidv4()
        that.list.cards = []
        that.list.dateCreated = Date.now()
        if (that.board.lists) {
          that.board.lists.push(that.list)
        } else {
          that.board.lists = []
          that.board.lists.push(that.list)
        }
        await that.updateBoard()
        that.list = {}
      }
    },
    async updateCardList(newlistId) {
      let that = this

      let tempListIndex = -1
      let tempCardIndex = -1
      let newListIndex = -1
      let tempListCount = 0
      let tempCardCount = 0

      //get the index in current cards current list
      for (const list of that.board.lists) {
        if (list.id === newlistId) {
          newListIndex = tempListCount
        }
        if (that.currentCard.listId === list.id) {
          //correct list, now find card
          tempListIndex = tempListCount
          for (const card of list.cards) {
            if (card.id === that.currentCard.id) {
              tempCardIndex = tempCardCount
            }
            tempCardCount++
          }
        }
        tempListCount++
      }

      //remove currentCard from current list
      that.board.lists[tempListIndex].cards.splice(tempCardIndex, 1)

      //add currentCard to its new list
      that.currentCard.listId = newlistId
      that.currentCard.dataCardCreated = Date.now()
      that.board.lists[newListIndex].cards.push(that.currentCard)

      await that.updateBoard()
    },
    allowDrop(ev) {
      ev.preventDefault()
    },
    drag(ev, card) {
      this.currentCard = card
    },
    drop(ev, listId) {
      ev.preventDefault()
      this.updateCardList(listId)
    },
    async deleteList(listId) {
      let that = this
      let index = -1
      let count = 0
      for (const list of that.board.lists) {
        if (list.id == listId) {
          index = count
        }
        count++
      }
      if (index > -1) {
        that.board.lists.splice(index, 1)
        await that.updateBoard()
      }
    },
    async createCard() {
      let that = this
      that.dialogCard = false
      //show modal to capture card name
      //add card
      if (that.card.title != '') {
        //add to firebase
        //Let's give our card a created date.
        that.card.id = uuidv4()
        that.card.dateCreated = Date.now()
        that.card.listId = that.listId

        function random_rgba() {
          let o = Math.round, r = Math.random, s = 255
          return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')'
        }

        let color = random_rgba()
        that.card.color = color
        // that.card.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`

        if (that.board.lists) {
          let index = -1
          let count = 0
          for (const list of that.board.lists) {
            if (list.id === that.listId) {
              index = count
            }
            count++
          }
          if (index != -1) {
            //we found the list, now push our card
            if (that.board.lists[index].cards) {
              that.board.lists[index].cards.push(that.card)
            } else {
              that.board.lists[index].cards = []
              that.board.lists[index].cards.push(that.card)
            }
          }
        }
        await that.updateBoard()
        that.card = {}
        that.listId = ''
      }
    },
    editCard(card) {
      this.dialogEditCard = true
      this.currentCard = card
    },
    async updateCard() {
      let that = this
      that.dialogEditCard = false
      for (const list of that.board.lists) {
        if (that.currentCard.listId === list.id) {
          //correct list, now find card
          for (let card of list.cards) {
            if (card.id === that.currentCard.id) {
              card = that.currentCard
            }
          }
        }
      }
      await that.updateBoard()
    },
    async deleteCard() {
      let that = this
      that.dialogEditCard = false
      let i = 0
      let j = 0
      let index = {
        list: -1,
        card: -1
      }
      for (const list of that.board.lists) {
        if (that.currentCard.listId === list.id) {
          //correct list, now find card
          for (const card of list.cards) {
            if (card.id === that.currentCard.id) {
              index.list = i
              index.card = j
            }
            j++
          }
        }
        i++
      }
      if (index.list > -1) {
        that.board.lists[index.list].cards.splice(index.card, 1)
        await that.updateBoard()
      }
    },
    async deleteBoard() {
      let that = this
      try {
        await that.$fire.firestore
          .collection('users')
          .doc(that.$fire.auth.currentUser.uid)
          .collection('boards')
          .doc(that.board.id).delete().then(() => {
            $nuxt.$router.push('/')
          }).catch(() => {

          })
      } catch (error) {
        $nuxt.$router.push('/')
      }
    },
    async updateBoard() {
      let that = this
      await that.$fire.firestore
        .collection('users')
        .doc(that.$fire.auth.currentUser.uid)
        .collection('boards')
        .doc(that.board.id)
        .update(that.board, { merge: true })
    }
  }
}
</script>

<style lang='scss' scoped>

.card {
  padding: 5px;
  margin-bottom: 15px;
  background-color: $white;
  border-radius: 10px;
  box-shadow: 10px 10px 50px rgba(145, 167, 168, 0.3);
  @media only screen and (max-width: 600px) {
    margin-top: 10px;
    min-height: 44px;
    background: #FFFFFF;
    box-shadow: 4px 4px 4px rgba(145, 167, 168, 0.1);
    border-radius: 10px;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  ::v-deep .v-card__text {
    margin: 0;
    padding-bottom: 0;
    padding-top: 0;
  }

  .card-title {
    padding: 8px 0 8px 0;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #333333;
  }

  .card-description {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #B9B9B9;
  }

  .card-until {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #B9B9B9;
    margin: 0;
  }

  .card-estimat {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #B9B9B9;

  }

  .card-author {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #333333;
  }

  .card-number {
    min-width: 60px;
    min-height: 10px;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #333333;
    @media only screen and (max-width: 600px) {
      font-style: normal;
      font-weight: 600;
      font-size: 10px;
      line-height: 12px;
      color: #B9B9B9;
    }
  }

  .card-project {
    margin-top: 8px;
    padding: 8px 0 8px 0;
    min-width: 110px;
    max-width: 300px;
    width: fit-content;
    min-height: 34px;
    border-radius: 10px;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    text-align: center !important;

    span {
      padding: 10px;
    }
  }

  .card-bottom {
    padding: 8px 0 8px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.board {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;

  ::v-deep .v-expansion-panel-content__wrap > .card {
    min-height: 44px;
    background: #FFFFFF;
    box-shadow: 4px 4px 4px rgba(145, 167, 168, 0.1);
    border-radius: 10px;
    margin-bottom: 0;
  }

  .content {
    .scroll-board {
      margin-top: 20px;
      min-height: 80vh;
      max-height: 80vh;
      overflow-y: hidden; /* Hide vertical scrollbar */
      overflow-x: auto; /* Hide vertical scrollbar */
      .scroll-board::-webkit-scrollbar {
        width: 30.34px;
        /* You can add other properties & values */
      }

      .scroll-board::-webkit-scrollbar-track {
        background-color: #123456;
        /* You can add other properties & values */
      }
    }

    ::-webkit-scrollbar {
      width: 0;
    }

    .list {
      overflow-y: auto; /* Hide vertical scrollbar */
      overflow-x: hidden;
      min-height: 50vh;
      min-width: 356px;
      max-width: 526px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.25);
      position: relative;
      margin-top: 0;

      @media only screen and (max-width: 600px) {
        margin-top: 10px;
        min-width: auto;
        min-height: auto;
        overflow-y: auto; /* Hide vertical scrollbar */
        overflow-x: hidden;
        .innerExPan::v-deep .v-expansion-panel-content__wrap {
          padding: 0;
          margin: 0;
        }
      }

      .list-header {
        @media only screen and (max-width: 600px) {
          border-radius: 15px 15px 15px 15px;
        }
        background-color: #ACCDFF;
        width: 100%;
        padding: 15px;
        margin-bottom: -6px;
        justify-content: space-between;
        color: $white;
        border-radius: 15px 15px 0px 0px;
      }


    }

  }


  .create-list {
    background-color: rgb(228 228 228 / 35%);
  }

  a {
    text-decoration: none;
  }

  .menu-items a {
    color: $text-color;
    padding: 10px 0px 10px 3px;
    font-size: 24px;
  }

  .board-topbar {
    background-color: rgb(255, 255, 255, 0);
    padding: 0px !important;
  }
}
</style>
