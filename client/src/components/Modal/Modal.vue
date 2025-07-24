<script>
  export default {
    props: {
      msg: String,
      redirect: {
        type: String,
        default: "/",
      },
      confirmation: {
        type: Boolean,
        default: false,
      },
      confirmTxt: {
        type: String,
        default: "Yes"
      },
      confirmCallback: {
        type: Function,
        default: ()=>{},
      },
      cancelCallback: {
        type: Function,
        default: ()=>{},
      }
    }
  }
</script>
<template>
  <div class="modal-background">
    <div class="modal-container">
      <div class="modal">
        <p>{{ msg }}</p>
        <div v-if="confirmation" class="modal-btn-container">
          <button @click="confirmCallback" class="modal-btn">{{ confirmTxt }}</button>
            <button @click="cancelCallback" class="modal-btn">Cancel</button>
        </div>
        <div v-else class="modal-btn-container">
          <button @click="confirmCallback" class="modal-btn">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.modal-background {
/*   display: none; */
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.4);
}

.modal-container {
  position: relative;
  height: 100%;
}

.modal {
  background: #1f1f1f;
  width: 25%;
  height: 28%;
  border-radius: 16px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -12.5% 0 0 -12.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modal p {
  color: white;
  font-size: 1rem;
  margin-top: 14%;
  margin-left: 22px;
  margin-right: 22px;
}

.modal-btn-container {
  display: flex;
  justify-content: center;
  gap: 0 8px;
}

.modal-btn {
  position: relative;
  margin-bottom: 22px;
  background: transparent;
  color: white;
  border-radius: 10px;
  border: 2px solid white;
/*   margin-left: 38%; */
/*   margin-right: 38%; */
/*   left: 42%; */
  width: 16%;
  padding: 8px 0;
}

.modal-btn:hover {
  background: #1bb21b;
  border: 2px solid transparent;
}

.modal-btn:active {
  transform: scale(0.9);
}

</style>
