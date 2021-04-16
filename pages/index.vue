<template>
  <v-container>
    <v-dialog v-model='dialog' max-width='355' persistent>
      <v-container class='d-block'>
        <v-row no-gutters align='center' justify='space-between'>
          <v-row no-gutters>
            <h3>Add Board</h3>
          </v-row>
          <v-icon @click='dialog = false'>mdi-close</v-icon>
        </v-row>
        <v-form ref='form' v-model='valid'>
          <div class='d-flex flex-column'>
            <v-text-field
              label='Board title'
              name='title'
              type='text'
              :rules="[(v) => !!v || 'Board title is required']"
              required
              v-model='board.title'
            ></v-text-field>
            <v-btn
              v-if='enableColor === false' depressed @click='enableColor = true'>
              Choose board color
            </v-btn>
            <br>
            <v-color-picker

              v-if='enableColor === true'
              v-model='board.color'
              dot-size='25'
              hide-inputs
              swatches-max-height='100'
            ></v-color-picker>
            <v-btn
              outlined
              color='#FC1370'
              :disabled='!valid' @click='createBoard'
            >Submit
            </v-btn
            >
          </div>
        </v-form>
      </v-container>
    </v-dialog>
    <div class='d-flex flex-row align-center justify-space-between'>
      <h1>My Boards</h1>
      <v-btn class='white--text'
             large
             color='#FC1370' depressed @click='addBoard'>ADD BOARD
      </v-btn>
    </div>
    <div class='d-flex flex-wrap align-center justify-start'>
      <p v-if='boards.length === 0'>You have no boards yet.</p>
      <v-card
        :style=" board.color ? `background-color:${board.color}` : ''"
        @click="$router.push('/boards/' + board.id)"
        class='jello-board-tile'
        v-for='board in boards'
        v-bind:key='board.id'
      >
        <v-card-title >
          {{ board.title }}
        </v-card-title>
        <v-card-subtitle >
          created {{ board.dateCreated | formatDate }}
        </v-card-subtitle>
      </v-card>
    </div>
    <v-snackbar
      :timeout='3000'
      v-model='snackbar'
      absolute
      bottom
      color='primary'
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  async asyncData() {
    //lets get our board data before page load, and then after that await changes
    let boardsRef = $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
      .collection('boards')
    let boardData = []
    await boardsRef
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.docs.length > 0) {
          try {
            for (const doc of querySnapshot.docs) {
              let data = doc.data()
              data.id = doc.id
              boardData.push(data)
            }
          } catch (err) {
          }
        }
      })
      .catch(function(error) {
      })
    return { boards: boardData }
  },
  data() {
    return {
      enableColor: false,
      dialog: false,
      valid: false,
      board: {
        title: '',
        color: ''
      },
      snackbar: false,
      snackbarText: 'No error message',
      currentImageId: ''
    }
  },
  created() {
    //lets watch our boards just to give it that realtime feel when we add or remove boards.
    let that = this
    $nuxt.$fire.firestore
      .collection(`users/${$nuxt.$fire.auth.currentUser.uid}/boards/`)
      .onSnapshot(function(querySnapshot) {
        if (querySnapshot.docs.length > 0) {
          that.boards = []
          try {
            for (const doc of querySnapshot.docs) {
              let data = doc.data()
              data.id = doc.id
              that.boards.push(data)
            }
          } catch (err) {
          }
        }
      })
  },
  methods: {
    addBoard() {
      //lets create a temp id we can use to save our doc and our storage files
      this.currentImageId = uuidv4()
      this.dialog = true
    },
    createBoard() {
      let that = this
      if (this.$refs.form.validate()) {
        //Let's give our board a created date.
        this.board.dateCreated = Date.now()
        this.$fire.firestore
          .collection('users')
          .doc(this.$fire.auth.currentUser.uid)
          .collection('boards')
          .doc(this.currentImageId)
          .set(this.board)
          .then(function(docRef) {
            that.dialog = false
            that.$refs.form.reset()
            that.snackbarText = 'Successfully created your board'
            that.snackbar = true
          })
          .catch(function(error) {
          })
      }
    },

    chooseImage() {
      this.$refs['boardBackground'].click()
    },

    uploadFiles() {
      const itemFilename =
        this.fileToUpload.uuid + '-' + this.fileToUpload.file.name
      const itemName =
        'images' +
        '/' +
        this.$fire.auth.currentUser.uid +
        '/' +
        'boards' +
        '/' +
        this.currentImageId +
        '/' +
        itemFilename

      const itemRef = this.$fire.storage.ref().child(itemName)
      const itemMeta = {
        customMetadata: {
          owner: this.$fire.auth.currentUser.uid
        }
      }

      // Action upload
      const task = itemRef.put(this.fileToUpload.file, itemMeta)

      // Watch for upload status Changes
      return task.on(
        'state_changed',
        // Handle progress
        (progress) => {
          // Set upload progress on item
          this.fileToUpload.progress =
            (progress.bytesTransferred / progress.totalBytes) * 100
        },
        // Handle unsuccessful uploads
        (error) => {
          this.fileToUpload.failed = true
          this.fileToUpload.error = error
          return false
        },
        // Handle successful uploads on complete
        async () => {
          const url = await task.snapshot.ref
            .getDownloadURL()
            .catch((e) => false)
          // Store form media
          this.board.image = {
            name: itemFilename,
            originalName: this.fileToUpload.file.name,
            downloadURL: url,
            uuid: this.fileToUpload.uuid
          }
        }
      )
    }
  }
}
</script>
<style lang='scss'>
.v-dialog {
  border-radius: 15px;
  background-color: $white;
  padding: 15px;
}

.upload-block {
  border: 2px dashed #adadad;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 20px;
}
</style>
