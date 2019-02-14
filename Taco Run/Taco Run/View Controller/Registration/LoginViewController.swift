//
//  LoginViewController.swift
//  Taco Run
//
//  Created by Nikita Thomas on 2/13/19.
//  Copyright © 2019 Nikita Thomas. All rights reserved.
//

import UIKit
import FirebaseUI
import Firebase

class LoginViewController: UIViewController, AuthUIDelegate, FUIAuthDelegate {

    @IBOutlet weak var passText: UITextField!
    @IBOutlet weak var emailText: UITextField!
    
    
    var authListener: AuthStateDidChangeListenerHandle?
    
    override func viewDidLoad() {
        super.viewDidLoad()


        setupFirebaseUI()
        
    }
    

    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        Auth.auth().removeStateDidChangeListener(authListener!)
        
    }

    
    
    @IBAction func getStartedTapped(_ sender: Any) {
        
        setupFirebaseUI()
    }
    
    func setupFirebaseUI() {
        
        let authUI = FUIAuth.defaultAuthUI()
        authUI?.delegate = self
        
        
        let providers: [FUIAuthProvider] = [
            FUIGoogleAuth(),
            FUIFacebookAuth(),
            FUITwitterAuth(),
            FUIEmailAuth()
            ]
        
        authUI?.providers = providers
        
        // listen for changes in the authorization state
        authListener = Auth.auth().addStateDidChangeListener { (auth, user) in
            
            
            if user != nil {
                self.performSegue(withIdentifier: "toMain", sender: self)
                
            } else {
                // user must sign in
                self.loginSession()
            }
        }
    }
    
    func loginSession() {
        let authViewController = FUIAuth.defaultAuthUI()!.authViewController()
        self.present(authViewController, animated: true, completion: nil)
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
