<template>
    <div>
        <h3 class="text-center">Add Post</h3>
        <div class="row justify-content-md-center">
            <div class="col-md-6">


                <form @submit.prevent="addPost">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control"  v-model="posts.title" :class="{ 'is-invalid': $v.posts.title.$error }">
                        <div v-if="!$v.posts.title.required" class="invalid-feedback">First Name is required</div>
                        <div v-if="!$v.posts.title.minLength" class="invalid-feedback">Name must have at least {{$v.posts.title.$params.minLength.min}} letters.</div>

<!--                        <span class="invalid-feedback" v-if="$v.title.$error">Name is required</span>-->
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control" v-model="posts.description" :class="{ 'is-invalid': $v.posts.description.$error }">
                        <div v-if="!$v.posts.description.required" class="invalid-feedback">description is required</div>
                    </div>

                    <div class="form-group">
                        <label>Status</label>
                        <div>

                            <label>
<!--                                <input type="radio"  value="1" v-model="posts.status" :class="{ 'is-invalid': $v.posts.status.$error }">-->
                                <input type="radio" name="bool" v-model="posts.status"  :class="{ 'error': $v.posts.status.$error }" :value="1"/>
                                Yes</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            <label>
<!--                                <input type="radio" value="0" v-model="posts.status" :class="{ 'is-invalid': $v.posts.status.$error }"> -->
                                <input type="radio" name="bool" v-model="posts.status" :class="{ 'error': $v.posts.status.$error }" :value="0"/>
                                No</label>

                        </div>
                        <div v-if="!$v.posts.status.required" class="invalid-feedback">status is required</div>

                    </div>
                    <button type="submit" class="btn btn-primary">Add Post</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            posts: {
                title: '',
                description: '',
                status: '',
            }
        }
    },
    validations: {
        posts: {
            title: { required,  minLength: minLength(4) },
            description: { required },
            status: { required },
            // lastName: { required },
            // email: { required, email },
            // password: { required, minLength: minLength(6) },
            // confirmPassword: { required, sameAsPassword: sameAs('password') }
        }
    },
    methods: {
        addPost() {
            console.log('submit!')
            this.$v.$touch()
            if (this.$v.$invalid) {
                return;
            }
            this.axios
                .post('/api/post/add', this.posts)
                .then(response => {
                    console.log(response.data)
                    this.$toaster.success('Your Application submitted successfully in postgreSQL.')
                    this.$router.push({name: 'home'})
                    // console.log(response.data)
                })
                .catch(error => console.log(error))
                .finally(() => this.loading = false)
        }
    }
}
</script>

<style>
input[type="radio"].error{
    outline: 1px solid red
}
.error {
    color: red !important;
    border: 1px solid red;
}
</style>
