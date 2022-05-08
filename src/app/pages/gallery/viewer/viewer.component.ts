import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from '../../../shared/models/Image';
import { Comment } from '../../../shared/models/Comment';
import { GalleryService } from '../../../shared/services/gallery.service';
import { CommentService } from '../../../shared/services/comment.service';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnChanges {

  @Input() imageInput?: Image;
  loadedImage?: string;
  //commentObject: Comment = {};
  comments: Array<Comment> = [];
  user?: User;

  commentsForm = this.fb.group({
    id: '',
    username: '',
    comment: '',
    date: 0,
    imageId: this.imageInput?.id
  });

  constructor(private fb: FormBuilder, private router: Router, private galleryService: GalleryService, private commentService: CommentService, private userService: UserService) { }


  ngOnChanges() {
    if (this.imageInput?.id) {
      this.commentsForm.get('imageId')?.setValue(this.imageInput.id);
      this.galleryService.loadImage(this.imageInput.image_url).subscribe(data => {
        this.loadedImage = data;
        /*let reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          this.loadedImage = reader.result as string;
        }*/
      });
      this.commentService.getCommentsByImageId(this.imageInput.id).subscribe(comments => {
        this.comments = comments;
      })
    }
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.commentsForm.get('username')?.setValue(this.user?.username);
    }, error => {
      console.error(error);
    });

  }

  createForm(model: Comment) {
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required, Validators.minLength(10)]);
    return formGroup;
  }

  addComment() {

    if (this.commentsForm.valid) {
      if (this.commentsForm.get('usernae') && this.commentsForm.get('comment')) {
        this.commentsForm.get('date')?.setValue(new Date().getTime());

        //this.comments.push({ ...this.commentsForm.value });
        this.commentService.create(this.commentsForm.value).then(_ => {
          this.router.navigateByUrl('/gallery/succesful/' + this.commentsForm.get('username')?.value);
        }).catch(error => {
          console.error(error);
        });

        

        /*if(this.commentObject.username && this.commentObject.comment){
          this.commentObject['date'] = new Date();
          this.comments.push({...this.commentObject});*/
        //this.comments.push(Object.assign({}, this.commentObject));
      }
    }
  }

}
