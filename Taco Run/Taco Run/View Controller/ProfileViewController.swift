//
//  ProfileViewController.swift
//  Taco Run
//
//  Created by Nikita Thomas on 2/13/19.
//  Copyright © 2019 Nikita Thomas. All rights reserved.
//

import UIKit
import FirebaseUI
import FirebaseAuth

class ProfileViewController: UIViewController {
    
    


    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    
    @IBAction func backButtonTapped(_ sender: Any) {
        
        dismiss(animated: true, completion: nil)
        
    }
    
    
    @IBAction func logoutTapped(_ sender: Any) {
        
        do {
            try Auth.auth().signOut()
            
            let storyboard = UIStoryboard(name: "Login", bundle: nil)
            let vc = storyboard.instantiateViewController(withIdentifier: "loginViewController") as! LoginViewController
            self.present(vc, animated: true, completion: nil)
            
        } catch {
            print("Could not sign user out")
        }
        
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
