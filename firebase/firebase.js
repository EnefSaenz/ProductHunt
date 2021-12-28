import { db, auth, storage } from "./config";

// Authenticate
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
// Upload Files
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// DB operations
import {
  addDoc,
  collection,
  doc,
  query,
  getDoc,
  getDocs,
  orderBy,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Main class
class Firebase {
  // For registering a user
  async register(name, email, password) {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(newUser.user, { displayName: name });
  }

  // For logging in a user
  async signInUser(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  // For signing out a user
  async signOutUser() {
    await auth.signOut();
  }

  // For uploading images to firebase
  async uploadImage(image) {
    const imageRef = ref(storage, `products/${Date.now()}${image.name}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);
    console.log(`La imagen se ha subido a la ruta: ${imageUrl}`);
    return imageUrl;
  }

  //============================CRUD============================//
  // For inserting new product on DB
  async insertProduct(product) {
    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Document written with ID: ", docRef.id);
  }

  // For getting products from DB
  async getProductsSnapshot(order) {
    const querySnapshot = await getDocs(
      query(collection(db, "products"), orderBy(order, "desc"))
    );

    return querySnapshot;
  }

  // For getting a product by ID
  async getProductById(id) {
    const response = await getDoc(doc(db, "products", id));
    return response;
  }

  // For updating a product
  async updateProduct(id, product) {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, product);
  }

  // For deleting a product by ID
  async deleteProductById(id) {
    await deleteDoc(doc(db, "products", id));
  }
}

const firebase = new Firebase();
export default firebase;
