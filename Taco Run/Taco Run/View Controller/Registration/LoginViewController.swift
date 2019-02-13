//
//  LoginViewController.swift
//  Taco Run
//
//  Created by Nikita Thomas on 2/13/19.
//  Copyright © 2019 Nikita Thomas. All rights reserved.
//

import UIKit



class LoginViewController: UIViewController {

    
    @IBOutlet weak var passText: UITextField!
    @IBOutlet weak var emailText: UITextField!
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

       
    }
    
    @IBAction func loginTapped(_ sender: Any) {
        
        
        
    }
    
    
    func loginUser(withEmail email: String, andPass pass: String) {
        
        guard !email.isEmpty else {
            //TODO: show no email error
            return
        }
        
        guard !pass.isEmpty else {
            // TODO: show no pass error
            return
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
